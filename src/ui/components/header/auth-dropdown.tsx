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
      <DropdownMenuTrigger className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent py-2 px-4 text-sm font-medium transition-colors hover:bg-slate-100 focus:bg-slate-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-slate-50 data-[active]:bg-slate-50">
        Menu
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64" align="end" sideOffset={15}>
        <DropdownMenuLabel className="text-right">
          <>
            <h2 className="text-md font-bold text-slate-500">
              {session?.user?.username}
            </h2>
            <p className="text-xs font-normal text-slate-500">
              {session?.user?.email}
            </p>
          </>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="justify-end"
          onSelect={() => void router.push("/profile")}
        >
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem
          className="justify-end"
          onSelect={() => void router.push("/settings")}
        >
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="justify-end"
          onSelect={() => {
            void signOut({ callbackUrl: "/auth/sign-in", redirect: false });
          }}
        >
          <Icons.logout className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
