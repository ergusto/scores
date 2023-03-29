import { useSession } from "next-auth/react";
import { Icons } from "@/ui/primitives/icons/index";
import Link from 'next/link';
import AuthDropdown from "./auth-dropdown";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle
} from "@/ui/primitives/navigation-menu";

export default function AuthHeader() {
  const { status } = useSession();

  const isAuthenticated = status === 'authenticated';

  return (
    <header className="container sticky top-0 z-40 bg-white">
      <div className="flex items-center justify-between h-16 border-b border-b-slate-200">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <Icons.logo />
            <span className="inline-block font-bold">Scores On The Doors</span>
          </Link>
          <NavigationMenu className="hidden gap-6 md:flex">
            <NavigationMenuList>
              {isAuthenticated ? (
                <>
                  <NavigationMenuItem>
                    <Link href="/" legacyBehavior passHref>
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Home
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/new" legacyBehavior passHref>
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        New
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </>
              ) : (
                <>
                  <NavigationMenuItem>
                    <Link href="/" legacyBehavior passHref>
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
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
          <div className="flex items-center font-semibold text-slate-600 text-sm">
            <AuthDropdown />
          </div>
        ) : (
          <div className="flex items-center font-semibold text-slate-600 text-sm"><Link href="/auth/sign-in">Sign in</Link></div>
        )}
      </div>
    </header>
  );
}
