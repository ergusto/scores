import { z } from "zod";

import { TRPCError } from "@trpc/server";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
  setUsername: protectedProcedure
    .input(z.object({ username: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { username } = input;

      const userExists = await ctx.prisma.user.findFirst({
        where: {
          username
        }
      });

      if (userExists) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: "That username is not available"
        });
      }

      return await ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id
        },
        data: {
          username,
          profileComplete: true
        }
      });
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});

