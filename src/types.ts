import type { OpponentHistory } from "@prisma/client";

export type SimpleUser = {
  id: string;
  username: string;
};

export type ExtendedUser = SimpleUser & {
  reverseOpponentHistories?: OpponentHistory[];
}
