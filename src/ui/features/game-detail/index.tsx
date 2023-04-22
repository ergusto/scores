import { api } from "@/lib/api";
import Skeleton from "./skeleton";
import { GameType } from "@prisma/client";
import HandForm from "@/ui/components/hand-form";
import HandList from "@/ui/components/hand-list";

export default function GameDetailFeature({
  id,
}: {
  id: string[] | string | undefined;
}) {
  const { data: game, isLoading } = api.game.get.useQuery(
    { id: String(id) },
    {
      enabled: !!id,
    }
  );

  if (!game || isLoading) {
    return <Skeleton />;
  }

  console.log(game.hands);

  return (
    <div>
      <header className="pt-6 pb-10">
        <h1 className="text-3xl font-bold">{game.title}</h1>
        <h3 className="text-md mt-4 text-gray-400">
          {game.gameType === GameType.FIRST_TO
            ? `First to ${String(game.gameTypeMeta)} points`
            : `Highest score after ${String(game.gameTypeMeta)} hands`}
        </h3>
      </header>
      <HandForm game={game} isLoading={isLoading} />
      <HandList
        game={game}
        hands={game?.hands}
        users={game?.users}
        isLoading={isLoading}
      />
    </div>
  );
}
