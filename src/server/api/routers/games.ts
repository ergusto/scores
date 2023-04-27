import { prisma } from "@/server/db";
import { z } from "zod";
import { type GameScore, GameType } from "@prisma/client";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { GameScoreWithUser } from "@/types";

const gameDetailProcedure = protectedProcedure.input(
  z.object({
    id: z.string(),
  })
);

const selectSimpleUserFields = {
  select: { id: true, username: true, image: true },
};

const gameIncludeParams = {
  users: selectSimpleUserFields,
  winner: selectSimpleUserFields,
  owner: selectSimpleUserFields,
  scores: {
    select: {
      id: true,
      score: true,
      user: selectSimpleUserFields
    },
  },
};

export const gameRouter = createTRPCRouter({
  many: protectedProcedure
    .input(
      z
        .object({
          searchString: z.string().optional(),
        })
        .optional()
    )
    .query(async ({ ctx }) => {
      return await ctx.prisma.game.findMany({
        where: {
          users: {
            some: {
              username: ctx.session.user.username,
            },
          },
        },
        orderBy: [
          {
            updatedAt: "desc",
          },
        ],
        include: gameIncludeParams,
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        gameType: z.nativeEnum(GameType),
        gameTypeMeta: z.number(),
        usernames: z.array(z.string()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { title, gameType, gameTypeMeta, usernames } = input,
        ownerId = ctx.session.user.id,
        usernameList = [
          { username: ctx.session.user.username },
          ...usernames.map((username: string) => ({ username })),
        ];

      return ctx.prisma.game.create({
        data: {
          title,
          gameType,
          gameTypeMeta,
          ownerId,
          users: {
            connect: usernameList,
          },
          order: {
            create: usernameList.map((user, index) => {
              return {
                order: 1 + index,
                user: {
                  connect: user,
                },
              };
            }),
          },
          scores: {
            create: usernameList.map((user) => ({
              user: {
                connect: user,
              },
            })),
          },
        },
      });
    }),

  get: gameDetailProcedure.query(async ({ ctx, input }) => {
    return await ctx.prisma.game.findFirstOrThrow({
      where: {
        id: input.id,
      },
      include: {
        ...gameIncludeParams,
        hands: {
          include: {
            scores: true,
          },
        },
        order: {
          include: {
            user: selectSimpleUserFields
          },
        },
      },
    });
  }),

  recordHand: gameDetailProcedure
    .input(
      z.object({
        scores: z.array(
          z.object({
            userId: z.string(),
            score: z.number(),
          })
        ),
        dealer: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id: gameId, scores, dealer: dealerId } = input;
      const date = new Date();

      const game = await ctx.prisma.game.findFirstOrThrow({
        where: {
          id: gameId,
        },
      });

      if (!game.active) {
        throw new Error("Game is not active");
      }

      // Don't await this, so we can update in a transaction
      const updateHand = ctx.prisma.hand.create({
        data: {
          game: {
            connect: { id: gameId },
          },
          scores: {
            create: scores.map((data) => {
              const { userId, score } = data;
              return {
                score,
                user: {
                  connect: { id: userId },
                },
              };
            }),
          },
          dealer: {
            connect: { id: dealerId },
          },
        },
      });

      // Don't await these, so we can update in a transaction
      const gameScoreQueries = scores.map((data) => {
        const { userId, score } = data;

        return ctx.prisma.gameScore.update({
          where: {
            userId_gameId: {
              userId,
              gameId,
            },
          },
          data: {
            score: {
              increment: score,
            },
          },
        });
      });

      // Don't await this, so we can update in a transaction
      const updateGame = ctx.prisma.game.update({
        where: {
          id: gameId,
        },
        data: {
          lastActivity: date,
          ...(!game.startedAt && { startedAt: date }),
        },
        include: {
          scores: true,
          hands: true,
        }
      });

      await prisma.$transaction([updateHand, ...gameScoreQueries, updateGame]);

      let winning_score = null;

      const updatedGame = await ctx.prisma.game.findFirstOrThrow({
        where: {
          id: gameId,
        },
        include: {
          scores: {
            select: {
              id: true,
              score: true,
              user: selectSimpleUserFields,
            },
          },
          hands: true,
        }
      });

      const sortedScores = updatedGame.scores.sort((a, b) => b.score - a.score) as GameScoreWithUser[];

      if (updatedGame.gameType === GameType.FIRST_TO) {
        winning_score = sortedScores.find((score: GameScoreWithUser) => score?.score >= updatedGame.gameTypeMeta) as GameScoreWithUser;
      } else if (updatedGame.gameType === GameType.SCORE_AFTER) {
        if (updatedGame.hands.length >= updatedGame.gameTypeMeta) {
          winning_score = sortedScores[0] as GameScoreWithUser;
        }
      }

    if (winning_score && winning_score?.user?.id) {   
      return await ctx.prisma.game.update({
        where: {
          id: gameId,
        },
        data: {
          winner: {
            connect: {
              id: winning_score.user.id
            }
          },
          endedAt: date,
          active: false,
        },
      });
    } else {
      return updatedGame;
    }
  }),
});
