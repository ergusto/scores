import { Prisma, type OpponentHistory } from "@prisma/client";

export type SimpleUser = {
  id: string;
  username: string;
  image?: string;
};

export type ExtendedUser = SimpleUser & {
  reverseOpponentHistories?: OpponentHistory[];
};

enum GameType {
  FIRST_TO,
  SCORE_AFTER,
}

export type Game = {
  id: string;
  active: boolean;
  createdAt: Date;
  endedAt?: Date;
  gameType: GameType;
  gameTypeMeta: number;
  lastActivity?: Date;
  match?: null;
  matchId?: string;
  owner: SimpleUser;
  ownerId: string;
  startedAt?: Date;
  title: string;
  updatedAt?: Date;
  users: SimpleUser[];
  winner: SimpleUser;
  winnerId: string;
};

export type GameWithUsers = Prisma.validator;
