import { z } from "zod";
import { env } from "~/env.mjs";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const { RAPIDAPI_APIKEY } = env;

export const hotelRouter = createTRPCRouter({
    test: publicProcedure
    .input(z.object({ checkIn: z.string() }))
    .query(async ({ input }) => {
      const res = await fetch(
        `https://travel-advisor.p.rapidapi.com/hotel-filters/v2/list?checkIn=${input.check_in}&X-RapidAPI-Key=${RAPIDAPI_APIKEY}` //To also add checkout day
      );
      const data = (await res.json()) as Record<string, any>; 

      return {
        hotel: `The avilable hotel is ${input.checkIn}`,
      };
    }),

})