import { z } from "zod";
import { env } from "~/env.mjs";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const { AIRLABS_APIKEY } = env;

export const flightRouter = createTRPCRouter({
  test: publicProcedure
    .input(z.object({ flight_iata: z.string() }))
    .query(async ({ input }) => {
      const res = await fetch(
        `https://airlabs.co/api/v9/flight?flight_iata=${input.flight_iata}&api_key=${AIRLABS_APIKEY}`
      );
      const data = (await res.json()) as Record<string, any>; // TODO: Handle this better

      return {
        flight: `Your flight iata is ${input.flight_iata}`,
      };
    }),
});
