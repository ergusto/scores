import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
  exists: publicProcedure
    .input(z.object({ email: z.string() }))
    .query( async ({ ctx, input }) => {
      const userExists = !!await ctx.prisma.user.findFirst({
        where: {
          email: input.email
        }
      });
      return {
        userExists
      };
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});

