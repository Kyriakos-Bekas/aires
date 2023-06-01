import { z } from "zod";
import { env } from "~/env.mjs";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import axios from "axios";

const { RAPIDAPI_APIKEY } = env;

export const hotelRouter = createTRPCRouter({
  test: publicProcedure
    .input(z.object({ name: z.string() })) //we have to pass all the parameters
    .query(async ({ input }) => {
      /*
      const options = {
        method: "GET",
        url: "https://booking-com.p.rapidapi.com/v1/hotels/search",
        params: {
          checkin_date: "2023-09-27",
          dest_type: "city",
          units: "metric",
          checkout_date: "2023-09-30",
          adults_number: "3",
          order_by: "popularity",
          dest_id: "-814876", 
          filter_by_currency: "EUR",
          locale: "en-gb",
          room_number: "1",
          categories_filter_ids: "class::2,class::4,free_cancellation::1",
          include_adjacency: "true",
        },
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key": `${RAPIDAPI_APIKEY}`,
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        },
      };
      */

      const options = {
        method: "GET",
        url: "https://booking-com.p.rapidapi.com/v1/hotels/locations",
        params: {
          name: "Athens",
          locale: "en-gb",
        },
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key": `${RAPIDAPI_APIKEY}`,
          "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        return {
          hotel: `The available hotels are ${input.name}`, //Pass the params through input
          response: response.data as Record<string, any>,
        };
      } catch (error) {
        console.error(error);
      }
    }),
});
