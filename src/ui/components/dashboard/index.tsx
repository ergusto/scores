import { api } from "@/lib/api";
import GameTable from "../game-table";
import ListActionMenuBar from "../list-actions";

export default function Dashboard() {
  const { data, isLoading, isError } = api.game.many.useQuery();

  return (
    <>
      <ListActionMenuBar isLoading={isLoading} />
      <GameTable games={data} isLoading={isLoading} />
    </>
  );
}
