import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import { api } from "@/lib/api";
import { Label, Input, Button } from "@/ui/primitives"

type FormValues = {
  username: string;
}

export default function UsernameForm() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const [mutationError, setMutationError] = useState('');

  const { mutate } = api.user.setUsername.useMutation({
    onSuccess: () => {
      router.push('/');
    },
    onError: () => {

    }
  });

  const onUsernameFormSubmitted: SubmitHandler<FormValues> = async (username: FormValues) => {
    const response = mutate(username);
    console.log(response);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onUsernameFormSubmitted)}>
        <Label>Please chooose a username</Label>
        <div className="flex w-full space-x-2 mt-1">
          <Input {...register("username", { required: true })} placeholder="Username" hasError={errors?.username ? true : false} />
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  )
}
