import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const planRouter = createTRPCRouter({
  getAll: privateProcedure.query(async ({ ctx }) => {
    const { userId } = ctx;

    const plans = await ctx.prisma.plan.findMany({
      where: { userId },
    });

    return { data: plans };
  }),
  create: privateProcedure
    .input(
      z.object({
        title: z.string(),
        price: z.number(),
        fromFlight: z.string(),
        toFlight: z.string(),
        accommodation: z.string(),
        eventId: z.string(),
        draft: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;
      const {
        price: totalPrice,
        toFlight: flightToEvent,
        fromFlight: flightFromEvent,
        ...rest
      } = input;

      try {
        // Create a new plan for the user
        const plan = await ctx.prisma.plan.create({
          data: { ...rest, totalPrice, userId, flightFromEvent, flightToEvent },
        });

        return {
          data: plan,
          message: "Your plan has been created successfully!",
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            "Something went wrong while creating your plan. Please try again later.",
        });
      }
    }),
  delete: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;
      const { id } = input;

      try {
        const userPlans = await ctx.prisma.plan.findMany({
          where: { userId },
        });

        if (!userPlans) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "You do not have permission to delete this plan.",
          });
        }

        const planForDeletion = userPlans.find((plan) => plan.id === id);

        if (!planForDeletion) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Plan not found.",
          });
        }

        const deletedPlan = await ctx.prisma.plan.delete({
          where: { id },
        });

        return {
          message: `Plan ${deletedPlan.title} has been deleted successfully!`,
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            "Something went wrong while deleting your plan. Please try again later.",
        });
      }
    }),
});
