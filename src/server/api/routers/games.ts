import { z } from "zod";
import { GameType } from "@prisma/client";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

const gameDetailParams = z.object({
  id: z.string(),
});

const gameCreateParams = z.object({
  title: z.string(),
  gameType: z.nativeEnum(GameType),
  gameTypeMeta: z.number(),
  usernames: z.array(z.string()),
});

const gameDetailProcedure = protectedProcedure.input(gameDetailParams);

export const gameRouter = createTRPCRouter({
  many: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.game.findMany({
      where: {
        users: {
          some: {
            username: ctx.session.user.username,
          },
        },
      },
      include: {
        users: {
          select: {
            username: true,
            id: true,
            image: true,
          },
        },
        winner: true,
        owner: {
          select: {
            username: true,
            id: true,
            image: true,
          },
        },
      },
    });
  }),
  create: protectedProcedure
    .input(gameCreateParams)
    .mutation(async ({ ctx, input }) => {
      const { title, gameType, gameTypeMeta, usernames } = input,
        ownerId = ctx.session.user.id;

      return ctx.prisma.game.create({
        data: {
          title,
          gameType,
          gameTypeMeta,
          ownerId,
          users: {
            connect: [
              ...usernames.map((username) => ({ username })),
              { username: ctx.session.user.username },
            ],
          },
        },
      });
    }),

  get: gameDetailProcedure.query(async ({ ctx, input }) => {
    return await ctx.prisma.game.findFirstOrThrow({
      where: {
        id: input.id,
      },
    });
  }),
});
