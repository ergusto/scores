import Head from "next/head";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import PageContainer from '@/ui/components/page-container'

function Home() {
  const { status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    void router.push("/auth/sign-in");
  }

  return (
    <>
      <Head>
        <title>Scores App</title>
        <meta name="description" content="Scores app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageContainer>
        <h1>Dashboard</h1>
      </PageContainer>

    </>
  );
}

export default Home;
