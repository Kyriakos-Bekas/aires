import { createTRPCRouter } from "~/server/api/trpc";
import { postRouter } from "~/server/api/routers/post";
import { flightRouter } from "~/server/api/routers/flight";
import { hotelRouter } from "./routers/hotel";
import { planRouter } from "./routers/plan";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  flight: flightRouter,
  hotel: hotelRouter,
  plan: planRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
