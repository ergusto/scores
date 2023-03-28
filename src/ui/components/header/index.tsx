import { useSession } from "next-auth/react";
import { Icons } from "@/ui/primitives/icons/index";
import Link from 'next/link';
import AuthDropdown from "./auth-dropdown";

export default function AuthHeader() {
  const { status } = useSession();

  const isAuthenticated = status === 'authenticated';

  return (
    <header className="container sticky top-0 z-40 bg-white">
      <div className="flex items-center justify-between h-16 py-4 border-b border-b-slate-200">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <Icons.logo />
            <span className="inline-block font-bold">Scores On The Doors</span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            {isAuthenticated ? (
              <>
                <Link href="/" className="flex items-center text-lg font-semibold text-slate-600 hover:text-slate-800 sm:text-sm">Home</Link>
                <Link href="/new" className="flex items-center text-lg font-semibold text-slate-600 hover:text-slate-800 sm:text-sm">New Game</Link>
              </>
            ) : (
              <>
                <Link href="/" className="flex items-center text-lg font-semibold text-slate-600 hover:text-slate-800 sm:text-sm">Home</Link>
              </>
            )}
          </nav>
        </div>
        {isAuthenticated ? (
          <div className="flex items-center text-lg font-semibold text-slate-600 sm:text-sm">
            <AuthDropdown />
          </div>
        ) : (
          <div className="flex items-center text-lg font-semibold text-slate-600 sm:text-sm"><Link href="/auth/sign-in">Sign in</Link></div>
        )}
      </div>
    </header>
  );
}
