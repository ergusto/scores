import Header from "@/ui/components/header";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout(props: LayoutProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'authenticated') {
    if (!session.user.profileComplete) {
      router.push('/welcome');
    }
  }

  return (
    <div className="flex flex-col mx-auto space-y-6">
      <Header />
      {props.children}
    </div>
  )
}

