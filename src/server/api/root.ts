import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { postRouter } from "~/server/api/routers/post";
import { flightRouter } from "~/server/api/routers/flight";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  post: postRouter,
  flight: flightRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
