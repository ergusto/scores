import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/primitives/dropdown";
import { Icons } from "@/ui/primitives/icons";

export default function AuthDropdown() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {session?.user?.username ?? session?.user?.email}
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64" align="end" sideOffset={25}>
        <DropdownMenuLabel className="text-right">
          <p className="text-sm text-slate-500 font-normal">{session?.user?.email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-end" onSelect={() => void router.push('/profile')}>
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem className="justify-end" onSelect={() => void router.push('/settings')}>
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-end" onSelect={() => { void signOut({ callbackUrl: '/auth/sign-in', redirect: false }) } }>
          <Icons.logout className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
