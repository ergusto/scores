import { useSession } from "next-auth/react";
import { api } from "@/lib/api";
import GameTable from "@/ui/components/game-table";
import ListActionMenuBar from "@/ui/components/list-actions";
import { useDashboardState } from "@/ui/state/dashboard";

export default function Dashboard() {
  const { searchString } = useDashboardState();

  const { data, isLoading: dataIsLoading } = api.game.many.useQuery({
    searchString,
  });

  const { status } = useSession();

  const sessionIsLoading = status === "loading";

  const isLoading = dataIsLoading || sessionIsLoading;

  return (
    <>
      <ListActionMenuBar isLoading={isLoading} />
      <GameTable games={data} isLoading={isLoading} />
    </>
  );
}
