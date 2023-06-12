import { TRPCError } from "@trpc/server";
import { format } from "date-fns";
import { z } from "zod";
import { hotels } from "~/data/hotels";
import { type LocationCode, locations } from "~/data/locations";
import { env } from "~/env.mjs";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import mapCodeToLocation from "~/utils/mapCodeToLocation";
import { request } from "~/utils/request";

const { RAPIDAPI_APIKEY } = env;

export const hotelRouter = createTRPCRouter({
  getHotels: privateProcedure
    .input(
      z.object({
        checkIn: z.date(),
        checkOut: z.date(),
        eventId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { checkIn, checkOut, eventId } = input;
      const post = await ctx.prisma.post.findUnique({
        where: { id: eventId },
      });

      if (!post) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Event not found",
        });
      }

      // Get lat and lng of the event location
      const eventLocation = locations.find(
        (location) => location.city_code === post.location
      ) as (typeof locations)[number]; // Assertion is safe because of the validation

      const data: SearchHotelsByLocationResponse<HotelResult[]> = {
        sortDisclaimer:
          '1,000 of 1,000+ places are available, sorted by <span class="underline">distance to me</span>',
        data: hotels.map((hotel) => ({
          ...hotel,
          title: formatTitle(hotel.title),
          cardPhotos: hotel.cardPhotos.map(formatPhoto),
        })),
      };
      // const { data } = await getHotels( // TODO: Uncomment this when the API is working
      //   eventLocation.lat,
      //   eventLocation.lng,
      //   format(checkIn, "yyyy-MM-dd"),
      //   format(checkOut, "yyyy-MM-dd")
      // );

      return {
        sortDisclaimer: data.sortDisclaimer,
        hotels: data.data ?? [],
        message: !!data.data
          ? `These are the hotels for we found for the dates ${checkIn.toDateString()} to ${checkOut.toDateString()} in ${mapCodeToLocation(
              post.location as LocationCode
            )}`
          : `We encountered a problem finding hotels for the dates ${checkIn.toDateString()} to ${checkOut.toDateString()} in the event location.`,
      };
    }),
});

type TripAdvisorAPIResponse<T> = {
  status: number;
  message: string;
  timestamp: string;
  data: T;
};

type SearchHotelsByLocationResponse<T> = {
  sortDisclaimer: string;
  data: T;
};

export type HotelResult = {
  id: string;
  title: string;
  primaryInfo: string | null;
  secondaryInfo: string | null;
  badge: {
    size: string;
    type: string;
    year: string;
  } | null;
  bubbleRating: {
    count: string;
    rating: number;
  };
  isSponsored: boolean;
  accentedLabel: boolean;
  provider: string;
  priceForDisplay: string | null;
  strikethroughPrice: string | null;
  priceDetails: string | null;
  priceSummary: string | null;
  cardPhotos: Photo[];
};

async function getHotels(
  lat: number,
  lng: number,
  checkIn: string,
  checkout: string
) {
  const url = `https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchHotelsByLocation?latitude=${lat}&longitude=${lng}&checkIn=%3C${checkIn}%3E&checkOut=%3C${checkout}%3E&pageNumber=1&currencyCode=EUR`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": `${RAPIDAPI_APIKEY}`,
      "X-RapidAPI-Host": "tripadvisor16.p.rapidapi.com",
    },
  };

  // const { data } = await request<
  //   TripAdvisorAPIResponse<SearchHotelsByLocationResponse<HotelResult[]>>
  // >(url, options);
  const response = await fetch(url, options);
  const data = (await response.json()) as TripAdvisorAPIResponse<
    SearchHotelsByLocationResponse<HotelResult[]>
  >;

  return data;
}

type Photo = {
  __typename: string;
  sizes: {
    __typename: string;
    maxHeight: number;
    maxWidth: number;
    urlTemplate: string;
  };
};

function formatTitle(title: string) {
  const [_number, ...rest] = title.split(" ");
  return rest.join(" ");
}

function formatPhoto(photo: Photo) {
  const returnedPhoto = { ...photo };
  returnedPhoto.sizes.urlTemplate = photo.sizes.urlTemplate.replace(
    "{width}",
    "1000"
  );
  return returnedPhoto;
}
