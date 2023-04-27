import { useState } from "react";
import { useRouter } from "next/router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { Button, Input, Icons } from "@/ui/primitives";
import { toast } from "@/lib/use-toast-hook";

interface AuthorisationFormProps {
  buttonText: string;
}

type FormValues = {
  email: string;
};

export default function AuthorisationForm({ buttonText = 'Sign In' }: AuthorisationFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { status: sessionStatus } = useSession();

  const { register, handleSubmit, reset: resetForm, formState: { errors } } = useForm<FormValues>();

  if (sessionStatus === "authenticated") {
    void router.push("/");
  }

  const onLoginFormSubmitted: SubmitHandler<FormValues> = async (credentials: FormValues) => {
    setIsLoading(true);

    try {
      const result = await signIn("email", {
        email: credentials.email,
        redirect: false,
      });

      setIsLoading(false);

      if (!result?.ok) {
        toast({
          title: "Something went wrong",
          description: "Your sign in request failed. Please try again.",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Check your email",
        description: "We've sent you a login link. Be sure to check your spam."
      });

      resetForm();

    } catch(error) {
      toast({
        title: "Something went wrong",
        description: "Your sign in request failed. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    // See https://github.com/react-hook-form/react-hook-form/discussions/8622
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleSubmit(onLoginFormSubmitted)}>
      <div className="grid gap-2">
        <div className="grid gap-1">
          <label htmlFor="email" className="font-medium leading-none sr-only peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</label>
          <Input {...register('email', { required: true })} hasError={errors?.email ? true : false} className="peer" type="email" placeholder="Email" autoComplete="none" autoCapitalize="none" autoCorrect="off" name="email" />
          {errors.email?.type === 'required' && <span className="px-1 text-xs text-red-600">Email is required</span>}
        </div>
        <Button disabled={isLoading} type="submit">
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          {buttonText}
        </Button>
      </div>
    </form>
  );
}
