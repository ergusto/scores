import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { api } from "@/lib/api";
import { Button, Input } from "@/ui/primitives";

interface UserSearchFormProps {
  onSelect: Function;
}

type FormValues = {
  username: string;
}

export default function UserSearchForm({ onSelect }: UserSearchFormProps) {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

  const { status, refetch } = api.user.getByUsername.useQuery({ username }, {
    enabled: false,
    onSuccess: data => {
      console.log(data);
    },
    onError: error => {
      console.dir('Error onError', error);
    },
  });

  const onSubmit = async ({ username }: { username: string; }) => {
    setUsername(username);
  };

  useEffect(() => {
    if (username && username.length) {
      refetch();
    }
  }, [username]);

  return (
    <form className="flex w-full items-center space-x-2" onSubmit={handleSubmit(onSubmit)}>
      <Input {...register("username", { required: true })} type="text" placeholder="Username" hasError={!!errors?.username} />
      <Button type="submit">Search</Button>
    </form>
  );
}
