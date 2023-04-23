import { Prisma } from "@prisma/client";

const selectSimpleUserFields = {
  select: { id: true, username: true, image: true },
};

const simpleUser = Prisma.validator<Prisma.UserArgs>()(selectSimpleUserFields);

export type SimpleUser = Prisma.UserGetPayload<typeof simpleUser>;

const userWithOpponents = Prisma.validator<Prisma.UserArgs>()({
  select: {
    id: true,
    username: true,
    image: true,
    reverseOpponentHistories: true,
  },
});

export type UserWithOpponents = Prisma.UserGetPayload<typeof userWithOpponents>;

const gameWithUsers = Prisma.validator<Prisma.GameArgs>()({
  include: {
    users: selectSimpleUserFields,
    winner: selectSimpleUserFields,
    owner: selectSimpleUserFields,
  },
});

export type GameWithUsers = Prisma.GameGetPayload<typeof gameWithUsers>;

const gameWithUsersScoresHandsAndOrder = Prisma.validator<Prisma.GameArgs>()({
  include: {
    users: selectSimpleUserFields,
    winner: selectSimpleUserFields,
    owner: selectSimpleUserFields,
    scores: {
      select: {
        id: true,
        score: true,
        user: selectSimpleUserFields,
      },
    },
    hands: {
      include: {
        scores: true,
      }
    },
    order: {
      include: {
        user: selectSimpleUserFields
      }
    }
  }
});

export type GameWithUsersScoresHandsAndOrder = Prisma.GameGetPayload<typeof gameWithUsersScoresHandsAndOrder>;

const handScoreWithUser = Prisma.validator<Prisma.HandScoreArgs>()({
  select: {
    score: true,
    user: {
      select: {
        id: true,
      },
    },
  },
});

export type HandScoreWithUser = Prisma.HandScoreGetPayload<
  typeof handScoreWithUser
>;

const handWithScoresAndUsers = Prisma.validator<Prisma.HandArgs>()({
  include: {
    scores: {
      include: {
        user: selectSimpleUserFields,
      },
    },
  },
});

export type HandWithScoresAndUsers = Prisma.HandGetPayload<
  typeof handWithScoresAndUsers
>;

const gameUserOrder = Prisma.validator<Prisma.GameUserOrderArgs>()({
  include: {
    user: selectSimpleUserFields,
  }
});

export type GameUserOrder = Prisma.GameUserOrderGetPayload<
  typeof gameUserOrder
>;
