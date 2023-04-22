import { useRouter } from "next/router";
import PageContainer from "@/ui/components/page-container";
import GameDetailFeature from "@/ui/features/game-detail";
import { useSession } from "next-auth/react";

export default function GameDetailPage() {
  const { status } = useSession();
  const router = useRouter();
  const { id } = router.query;

  if (status === "unauthenticated") {
    void router.push("/auth/sign-in");
  }

  return (
    <PageContainer hasSidebar={false} fullHeight={false}>
      <GameDetailFeature id={id} />
    </PageContainer>
  );
}
