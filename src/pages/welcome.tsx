import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Welcome() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'unauthenticated') {
    router.push('/auth/sign-in');
  }

  return (
    <div className="container grid gap-12 md:grid-cols-[200px_1fr]">
      <h2>Welcome to Scores</h2>
      <p>A few details are required to finalise setting up your account...</p>

    </div>
  );
}
