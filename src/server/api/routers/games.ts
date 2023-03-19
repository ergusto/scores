import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";

export const gameRouter = createTRPCRouter({
	all: protectedProcedure.query(async ({ ctx }) => {
		return await ctx.prisma.game.findMany({
			where: {
				users: {
					some: {
						id: ctx.session.user.id,
					}
				}
			}
		});
	}),

	create: protectedProcedure.input(z.object({ })).mutation(async ({ ctx, input }) => {
		return ctx.prisma.game.create({
			data: input,
			user: {
				connect: {
					id: ctx.session.user.id
				}
			},
		});
	}),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
