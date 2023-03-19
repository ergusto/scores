import Head from "next/head";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

function Home() {
  const { status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("/auth/sign-in");
  }

  return (
    <>
      <Head>
        <title>Scores App</title>
        <meta name="description" content="Scores app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Dashboard</h1>

    </>
  );
}

export default Home;
