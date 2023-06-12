import { z } from "zod";
import { flights } from "~/data/flights";
import { locations } from "~/data/locations";
import { env } from "~/env.mjs";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import { request } from "~/utils/request";
import {
  type FlightFairResult,
  type FlightFairResponse,
  type FlightSimplified,
} from "~/utils/types";

const MAX_DISTANCE = 200; // km
const { AIRLABS_APIKEY, RAPIDAPI_APIKEY } = env;

const filterFlight = (flight: FlightFairResult): FlightSimplified => {
  const {
    careerCode: _careerCode,
    path: _path,
    duration,
    departureAirport,
    arrivalAirport,
    totals,
    ...rest
  } = flight;

  const {
    tz: _tzDep,
    timeZone: _timeZoneDep,
    country: countryDep,
    ...restDepAirport
  } = departureAirport;
  const {
    tz: _tzArr,
    timeZone: _timeZoneArr,
    country: countryArr,
    ...restArrAirport
  } = arrivalAirport;
  const {
    baggage: _baggageTotals,
    penalty: _penaltyTotals,
    ...restTotals
  } = totals;

  return {
    ...rest,
    duration: duration.text,
    departureAirport: {
      ...restDepAirport,
      country: countryDep.label,
    },
    arrivalAirport: {
      ...restArrAirport,
      country: countryArr.label,
    },
    totals: { ...restTotals },
  };
};

export const flightRouter = createTRPCRouter({
  getToFlights: privateProcedure
    .input(
      z.object({
        date: z.date(),
        userLocation: z.string(),
        postLocation: z.string(),
      })
    )
    .query(async ({ input }) => {
      // Get lat and lng of the user
      const userLocation = locations.find(
        (location) => location.city_code === input.userLocation
      ) as (typeof locations)[number]; // Assertion is safe because of the validation

      // Skip API calls if user is in the same city as the event
      if (userLocation.city_code === input.postLocation) {
        return {
          flights: [],
          message: "The event is in the same city as you are. No need to fly!",
        };
      }

      // Find the nearest airport to the user
      const nearestFromAirport = await getNearestAirport(
        userLocation.lat,
        userLocation.lng
      );

      // Get lat and lng of the destination
      const postLocation = locations.find(
        (location) => location.city_code === input.postLocation
      ) as (typeof locations)[number]; // Assertion is safe because of the validation

      // Find the nearest airport to the destination
      const nearestDestAirport = await getNearestAirport(
        postLocation.lat,
        postLocation.lng
      );

      // If we couldn't find any of the airports, return an appropriate message
      // if (
      //   !nearestFromAirport ||
      //   !nearestFromAirport.iata_code ||
      //   !nearestDestAirport ||
      //   !nearestDestAirport.iata_code
      // )
      //   return {
      //     flights: [],
      //     message:
      //       "There was a problem finding airports for this route. Sorry!",
      //     flightsFrom: nearestFromAirport,
      //     flightsDest: nearestDestAirport,
      //   };

      // Get flights
      // const responseFlights = await getFlights(
      //   nearestFromAirport.iata_code,
      //   nearestDestAirport.iata_code,
      //   input.date.toDateString()
      // ); // TODO: Uncomment when we have a working API key
      // ! We'll need to store the flight code for the plan

      return {
        flights: flights.to.map(filterFlight), // TODO: Change from dummy data to real data
        flightsFrom: nearestFromAirport,
        flightsDest: nearestDestAirport,
        message: !!flights.to.length // TODO: Change to 'responseFlights' when we have a working API key
          ? "Here's a list of airports near you that you can fly from!"
          : "We couldn't find any flights for this route. Sorry!",
      };
    }),
});

type AirLabsApiResponse<T> = {
  request: unknown;
  response: T;
  terms: string;
};

type Airport = {
  country_code: string;
  iata_code?: string;
  icao_code: string;
  distance: number;
  lat: number;
  lng: number;
  name: string;
  popularity: number;
};

type City = {
  country_code: string;
  distance: number;
  lat: number;
  lng: number;
  name: string;
  popularity: number;
};

async function getNearestAirport(lat: number, lng: number) {
  const url = `https://airlabs.co/api/v9/nearby?lat=${lat}&lng=${lng}&distance=${MAX_DISTANCE}&api_key=${AIRLABS_APIKEY}`;
  const { response } = await request<
    AirLabsApiResponse<{
      airports: Airport[];
      cities: City[];
    }>
  >(url);

  // ! Failing: Returns only undefined. Investigate
  console.log(">>> response", response);

  if (!response) return null;
  // Prefer most popular airport
  const nearestAirport = response.airports.sort(
    (a, b) => b.popularity - a.popularity
  )[0] as Airport | undefined;

  if (!nearestAirport) return null;

  if (!nearestAirport.iata_code) {
    nearestAirport.iata_code = await getAirportIataCode(
      nearestAirport.icao_code
    );
    // If we still don't have an iata_code, do not proceed
    if (!nearestAirport.iata_code) return null;
  }
  return nearestAirport;
}

type AirportGetIataCodeResponse = {
  country_code: string;
  iata_code: string;
  icao_code: string;
  lat: number;
  lng: number;
  name: string;
};

async function getAirportIataCode(airportIcaoCode: string) {
  const url = `https://airlabs.co/api/v9/airports?icao_code=${airportIcaoCode}&api_key=${AIRLABS_APIKEY}`;

  const { response } = await request<
    AirLabsApiResponse<AirportGetIataCodeResponse[]>
  >(url);
  return response[0]?.iata_code as string;
}

async function getFlights(
  departureAirport: string,
  arrivalAirport: string,
  date: string
) {
  const url = `https://flight-fare-search.p.rapidapi.com/v2/flight/?from=${departureAirport}&to=${arrivalAirport}&date=%3C${date}%3E&adult=1&type=economy&currency=EUR`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": `${RAPIDAPI_APIKEY}`,
      "X-RapidAPI-Host": "flight-fare-search.p.rapidapi.com",
    },
  };
  const { results } = await request<FlightFairResponse>(url, options);

  return results;
}
