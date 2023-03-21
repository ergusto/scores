import Link from "next/link";
import AuthorisationForm from "@/ui/components/auth-form";

export default function LogIn() {
  return (
    <div className='min-h-screen mt-0'>
      <div className="container flex flex-col items-center justify-center w-screen h-screen mx-auto">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col text-center space-y-2">
            <h1 className='fixed top-0 left-0 right-0 pt-4 mx-auto font-semibold tracking-tight text-center text-1xl w-100'>Scores On The Doors</h1>
            <h2 className="text-2xl font-semibold tracking-tight">Welcome</h2>
            <p className="text-sm text-slate-500">Enter your email address to create an account</p>
          </div>
          <div className="grid gap-6">
            <AuthorisationForm buttonText="Sign Up" />
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-300"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="px-2 bg-white text-slate-600">Or <Link href="/auth/sign-in" className='underline decoration-black underline-offset-2 text-slate-600'>Sign In</Link></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
