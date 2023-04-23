import type { GameWithUsers } from "@/types";
import { GameType } from "@prisma/client";

interface GameHeaderProps {
  game: GameWithUsers;
  isLoading: boolean;
}

export default function GameHeader({ game }: GameHeaderProps) {
  if (!game) {
    return <div />;
  }

  return (
    <header className="pt-6 pb-10">
      <h1 className="text-3xl font-bold">{game.title}</h1>
      <h3 className="text-md mt-4 text-gray-400">
        {game.gameType === GameType.FIRST_TO
          ? `First to ${String(game.gameTypeMeta)} points`
          : `Highest score after ${String(game.gameTypeMeta)} hands`}
      </h3>
    </header>
  );
}
