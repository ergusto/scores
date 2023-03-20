import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { Button, Input } from "@/ui/primitives";

interface AuthorisationFormProps {
  buttonText: string;
}

type FormValues = {
  email: string;
};

export default function AuthorisationForm({ buttonText = 'Sign In' }: AuthorisationFormProps) {
  const router = useRouter();
  const { status: sessionStatus } = useSession();

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

  if (sessionStatus === "authenticated") {
    router.push("/");
  }

  const onLoginFormSubmitted: SubmitHandler<FormValues> = async (credentials: FormValues) => {
    signIn("email", { email: credentials.email });
  };

  return (
    <form onSubmit={handleSubmit(onLoginFormSubmitted)}>
      <div className="grid gap-2">
        <div className="grid gap-1">
          <label htmlFor="email" className="text-sm font-medium leading-none sr-only peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</label>
          <Input {...register('email', { required: true })} hasError={errors?.email ? true : false} className="peer" type="email" placeholder="Email" autoComplete="none" autoCapitalize="none" autoCorrect="off" name="email" />
          {errors.email?.type === 'required' && <span className="px-1 text-xs text-red-600">Email is required</span>}
        </div>
        <Button type="submit">{buttonText}</Button>
      </div>
    </form>
  );
}
