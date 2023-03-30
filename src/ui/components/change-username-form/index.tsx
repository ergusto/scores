import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
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

  const { mutate, isLoading } = api.user.setUsername.useMutation({
    onError: (error) => {
      if (error.message == 'That username is not available') {
        setMutationError('That username is not available. Please choose another.');
      }
    }
  });

  const onUsernameFormSubmitted: SubmitHandler<FormValues> = (username: FormValues) => {
    mutate(username, {
      onSuccess: () => {
        router.reload();
      }
    });
  };

  return (
    <div className="w-full">
      <form onSubmit={void handleSubmit(onUsernameFormSubmitted)}>
        <Label>Please chooose a username</Label>
        <div className="flex w-full space-x-2 mt-1">
          <Input {...register("username", { minLength: 4, required: true, onChange: () => setMutationError('') })} placeholder="Username" hasError={mutationError || errors?.username ? true : false} />
          <Button type="submit" disabled={isLoading}>Submit</Button>
        </div>
        {mutationError && <p className="text-sm mt-2 text-red-500">{mutationError}</p> || errors?.username?.type === 'required' && <p className="text-sm mt-2 text-red-500">Username is required</p>}
      </form>
    </div>
  )
}
