import { PrismaClient } from "@prisma/client";
import { User } from "@prisma/client";
import { prisma } from "@/server/db";

async function addGameHistoryToUser(user1: User, user2: User) {

}

async function addGameHistoryToUsers(user: User, users: User[]) {
  
}

export {
  addGameHistoryToUser,
  addGameHistoryToUsers
};
