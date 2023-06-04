import { z } from "zod";
import { env } from "~/env.mjs";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import axios from "axios";
import { TRPCError } from "@trpc/server";

const { RAPIDAPI_APIKEY } = env;

export const hotelRouter = createTRPCRouter({
  test: publicProcedure
    .input(z.object({ checkIn: z.string() }))
    .query(async ({ input }) => {
      /*
      const options = {
        method: 'GET',
        url: 'https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchLocation',
        params: {
          query: 'athens'
        },
        headers: {
          'X-RapidAPI-Key': `${RAPIDAPI_APIKEY}`,
          'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
        }
      };
      */

      const options = {
        method: "GET",
        url: "https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchHotels",
        params: {
          geoId: 189400,
          checkIn: "2023-09-27",
          checkOut: "2023-09-30",
          currencyCode: "EUR",
        },
        headers: {
          "X-RapidAPI-Key": `${RAPIDAPI_APIKEY}`,
          "X-RapidAPI-Host": "tripadvisor16.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        return {
          hotel: `The available hotels are ${input.checkIn}`, //Pass the params through input
          response: response.data as Record<string, any>,
        };
      } catch (error) {
        console.log("-------------------------------------");
        console.log(error);
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
});
