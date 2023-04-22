import { useSession } from "next-auth/react";
import { Icons } from "@/ui/primitives/icons/index";
import Link from "next/link";
import AuthDropdown from "./auth-dropdown";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/ui/primitives/navigation-menu";

export default function AuthHeader() {
  const { status } = useSession();

  const isAuthenticated = status === "authenticated";

  return (
    <header className="sticky top-0 z-40 bg-white">
      <div className="container">
        <div className="flex h-16 items-center justify-between border-b border-b-slate-200">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <Icons.logo />
              <span className="inline-block font-bold">
                Scores On The Doors
              </span>
            </Link>
            <NavigationMenu className="hidden gap-6 md:flex">
              <NavigationMenuList>
                {isAuthenticated ? (
                  <>
                    <NavigationMenuItem>
                      <Link href="/" legacyBehavior passHref>
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                        >
                          Home
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <Link href="/new" legacyBehavior passHref>
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                        >
                          New
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  </>
                ) : (
                  <>
                    <NavigationMenuItem>
                      <Link href="/" legacyBehavior passHref>
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                        >
                          Home
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  </>
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          {isAuthenticated ? (
            <div className="flex items-center text-sm font-semibold text-slate-600">
              <AuthDropdown />
            </div>
          ) : (
            <div className="flex items-center text-sm font-semibold text-slate-600">
              <Link href="/auth/sign-in">
                <button className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent py-2 px-4 text-sm font-medium transition-colors hover:bg-slate-100 focus:bg-slate-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-slate-50 data-[active]:bg-slate-50">
                  Sign in
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
