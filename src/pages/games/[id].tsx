import { useRouter } from "next/router";
import { api } from "@/lib/api";

export default function GameDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading } = api.game.get.useQuery({ id });

  console.log(data);

  return (
    <div>
      <h1>Game Detail</h1>
    </div>
  );
}
