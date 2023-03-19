import { createTRPCRouter } from "@/server/api/trpc";
import { gameRouter } from "@/server/api/routers/games";
import { exampleRouter } from "./routers/example";
import { userRouter } from "./routers/users";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  game: gameRouter,
	example: exampleRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
