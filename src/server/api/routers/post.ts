import { type Post } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { eventPostFormSchema } from "~/utils/schemas";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

const filterPost = (post: Post) => {
  const { published, ...returnedPost } = post;
  return returnedPost;
};

export const postRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.prisma.post.findMany({
      where: { published: true },
    });

    return posts.filter(filterPost);
  }),
  getOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      if (!input.id) return null; // TODO: Handle this better

      const post = await ctx.prisma.post.findUnique({
        where: { id: input.id },
      });

      // If the post doesn't exist, throw a NOT_FOUND error
      if (!post) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Post not found",
        });
      }

      // If the post isn't published, throw an UNAUTHORIZED error
      if (!post.published) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You cannot access this post",
        });
      }

      return filterPost(post);
    }),
  create: privateProcedure
    .input(eventPostFormSchema)
    .mutation(async ({ input, ctx }) => {
      const { userId } = ctx;
      const post = await ctx.prisma.post.create({
        data: {
          ...input,
          published: false,
          partnerId: userId,
        },
      });

      return post;
    }),
  getAllFromAuthor: privateProcedure.query(async ({ ctx }) => {
    const { userId } = ctx;

    const posts = await ctx.prisma.post.findMany({
      where: { partnerId: userId },
    });

    return posts;
  }),
  changeStatus: privateProcedure
    .input(z.object({ id: z.string(), published: z.boolean() }))
    .mutation(async ({ input, ctx }) => {
      const { id, published } = input;

      const post = await ctx.prisma.post.update({
        where: { id },
        data: { published },
      });

      return post;
    }),
  delete: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { id } = input;

      const post = await ctx.prisma.post.delete({
        where: { id },
      });

      return post;
    }),
});
