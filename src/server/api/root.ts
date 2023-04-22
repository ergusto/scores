import { createTRPCRouter } from "@/server/api/trpc";
import { userRouter } from "./routers/users";
import { gameRouter } from "./routers/games";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  game: gameRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
