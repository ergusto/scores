import { api } from "@/lib/api";
import HandForm from "@/ui/components/hand-form";
import HandList from "@/ui/components/hand-list";
import GameHeader from "@/ui/components/game-header";
import { useGameDetailState } from "@/ui/state/gameDetail";
import ConfettiComponent from "@/ui/components/confetti";

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
  const { showGameEndModal, actions } = useGameDetailState();

  actions.showModal();

  return (
    <div>
      <GameHeader game={game} isLoading={!game || isLoading} />
      <HandForm game={game} isLoading={!game || isLoading} onGameEnd={actions.showModal} />
      <HandList game={game} isLoading={!game || isLoading} />
      {showGameEndModal && <ConfettiComponent />}
    </div>
  );
}
