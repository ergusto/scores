import { api } from "@/lib/api";
import HandForm from "@/ui/components/hand-form";
import HandList from "@/ui/components/hand-list";
import GameHeader from "@/ui/components/game-header";

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

  return (
    <div>
      <GameHeader game={game} isLoading={!game || isLoading} />
      <HandForm game={game} isLoading={!game || isLoading} />
      <HandList game={game} isLoading={!game || isLoading} />
    </div>
  );
}
