import { PrismaClient } from "@prisma/client";
import { User } from "@prisma/client";

type PrismaClientType = typeof PrismaClient;

export default async function addGameHistoryToUsers(prisma: PrismaClientType, users: User[]) {

}
