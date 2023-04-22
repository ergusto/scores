import Header from "@/ui/components/header";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout(props: LayoutProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "authenticated") {
    if (!session.user.profileComplete) {
      if (router.pathname != "/welcome") {
        void router.push("/welcome");
      }
    }
  }

  return (
    <div className="mx-auto flex flex-col space-y-6">
      <Header />
      {props.children}
    </div>
  );
}
