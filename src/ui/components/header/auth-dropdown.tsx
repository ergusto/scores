import { useSession, signOut } from "next-auth/react";
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {session?.user?.username ?? session?.user?.email}
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64" align="end" sideOffset={25}>
        <DropdownMenuLabel className="text-right">
          <p>My Account</p>
          <p className="mt-1 text-slate-500">{session?.user?.email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => signOut({ callbackUrl: '/auth/sign-in', redirect: false })}>
          <Icons.logout className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
