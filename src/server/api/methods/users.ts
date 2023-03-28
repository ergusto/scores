import type { User } from "@prisma/client";
import { prisma } from "@/server/db";

async function getOrCreateGameHistoryForUser(user: User, opponent: User) {
  let history = await prisma.opponentHistory.findFirst({
    where: {
      userId: user.id,
      opponentId: opponent.id,
    },
  });

  if (!history) {
    history = await prisma.opponentHistory.create({
      data: {
        userId: user.id,
        opponentId: opponent.id
      }
    });
    await prisma.opponentHistory.create({
      data: {
        userId: opponent.id,
        opponentId: user.id,
      }
    });
  }

  return history;
}

export {
  getOrCreateGameHistoryForUser,
};
