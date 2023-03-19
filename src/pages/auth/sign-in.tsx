import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect, ChangeEvent } from "react"
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { api } from "@/lib/api";
import { Button, Input } from "@/ui/primitives";
import { validateEmail, useLazyEffect } from "@/lib/utils";

type FormValues = {
  email: string;
  username: string;
};

export default function LogIn() {
  const router = useRouter();
  const { status: sessionStatus } = useSession();

  const [emailValue, setEmailValue] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [showUsernameInput, setShowUsernameInput] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

  if (sessionStatus === "authenticated") {
    router.push("/");
  }

  const { status: queryStatus, data, error, isFetching } = api.user.exists.useQuery({ email: emailValue }, { enabled: isValidEmail });

  const emailOnChangeHandler = (event: ChangeEvent) => {
    const input = event.currentTarget as HTMLInputElement;
    setEmailValue(input.value);
  };

  const emailValidHandler = () => {
    if (emailValue.length) {
      setDisableSubmit(true);
      setShowUsernameInput(false);
      setIsSignUp(false);
      const isValid = validateEmail(emailValue);
      if (isValid) {
        setIsValidEmail(true);
      } else {
        setIsValidEmail(false);
      }
    } else {
      setDisableSubmit(false);
      setShowUsernameInput(false);
      setIsSignUp(false);
    }
  };

  useEffect(emailValidHandler, [emailValue]);

  useLazyEffect(() => {
    // set whether user can log in or needs to provide a username
    const userExists = data?.userExists === true;

    if (isValidEmail && !userExists) {
      setShowUsernameInput(true);
      setIsSignUp(true);
    } else {
      setShowUsernameInput(false);
      setIsSignUp(false);
    }

    setDisableSubmit(false);

  }, [isValidEmail, isFetching], 500);

  const onLoginFormSubmitted: SubmitHandler<FormValues> = async (credentials: FormValues) => {
    signIn("email", { email: credentials.email, name: credentials.username });
  };

  return (
    <div className='min-h-screen mt-0'>
      <div className="container flex flex-col items-center justify-center w-screen h-screen mx-auto">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col text-center space-y-2">
            <h1 className='fixed top-0 left-0 right-0 pt-4 mx-auto font-semibold tracking-tight text-center text-1xl w-100'>Scores On The Doors</h1>
            <h2 className="text-2xl font-semibold tracking-tight">Welcome{isSignUp ? '' : ' back'}</h2>
            <p className="text-sm text-slate-500">{isSignUp ? 'Enter your email and a username to register' : 'Enter your email to sign in to your account'}</p>
          </div>
          <div className="grid gap-6">
            <form onSubmit={handleSubmit(onLoginFormSubmitted)}>
              <div className="grid gap-2">
                <div className="grid gap-1">
                  <label htmlFor="email" className="text-sm font-medium leading-none sr-only peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</label>
                  <Input {...register('email', {
                    required: true,
                    onChange: emailOnChangeHandler
                  })} className="peer" type="email" placeholder="Email" autoComplete="none" autoCapitalize="none" autoCorrect="off" name="email" value={emailValue} />
                  {errors.email?.type === 'required' && <span className="px-1 text-xs text-red-600">Email is required</span>}
                </div>
                {showUsernameInput && (
                  <div className="grid gap-1">
                    <label htmlFor="username" className="text-sm font-medium leading-none sr-only peer-disabled:cursor-not-allowed peer-disabled:opacity-70">username</label>
                    <Input {...register('username', { required: true })} className="peer" type="text" placeholder="Username" autoComplete="none" autoCapitalize="none" autoCorrect="off" name="username" />
                    {errors.username?.type === 'required' && <span className="px-1 text-xs text-red-600">Username is required</span>}
                  </div>
                )}
                <Button disabled={disableSubmit}>{isSignUp ? 'Sign Up' : 'Sign In'}</Button>
              </div>
            </form>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-300"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="px-2 bg-white text-slate-600">Or <Link href="/auth/sign-up" className='underline decoration-black underline-offset-2 text-slate-600'>Sign up</Link> </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
