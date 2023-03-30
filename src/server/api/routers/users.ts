import { z } from "zod";

import { TRPCError } from "@trpc/server";
import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import { getOrCreateGameHistoryForUser } from "../methods/users";
import { type ExtendedUser } from "@/types";

export const userRouter = createTRPCRouter({
  setUsername: protectedProcedure
    .input(z.object({ username: z.string().min(4) }))
    .mutation(async ({ ctx, input }) => {
      const username = input?.username?.toLowerCase().trim();
      const user = ctx.session.user;

      if (user.profileComplete) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You are not able to change your username at this time."
        });
      }

      const existingUser = await ctx.prisma.user.findFirst({
        where: {
          username
        }
      });

      if (existingUser) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: "That username is not available"
        });
      }

      return await ctx.prisma.user.update({
        where: {
          id: user.id
        },
        data: {
          username,
          profileComplete: true
        }
      });
    }),

  getByUsername: protectedProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ ctx, input }) => {
      const { username } = input;

      if (username.toLowerCase().trim() === ctx.session.user.username) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'You cannot play a game against yourself',
        });
      }

      const user = await ctx.prisma.user.findFirstOrThrow({
        where: {
          username
        },
        select: {
          username: true,
          id: true,
          reverseOpponentHistories: {
            where: {
              userId: ctx.session.user.id
            }
          }
        },
      });

      return user;
    }),

});

