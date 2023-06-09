import { useState } from "react";
import { useForm } from "react-hook-form";
import { getQueryKey } from "@trpc/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Button, Input, Icons } from "@/ui/primitives";
import type { UserWithOpponents } from "@/types";
import UserSearchFormItem from "./item";

interface UserSearchFormProps {
  onSelect: (user: UserWithOpponents) => void;
  users: UserWithOpponents[];
  onRemove: (user: UserWithOpponents) => void;
}

type FormValues = {
  username: string;
};

export default function UserSearchForm({
  users,
  onSelect,
  onRemove,
}: UserSearchFormProps) {
  const [searchString, setSearchString] = useState("");
  const [error, setError] = useState("");
  const {
    reset: resetForm,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const { data, refetch, isFetching } = api.user.getByUsername.useQuery(
    { username: searchString },
    {
      enabled: false,
      retry: 1,
      onError: (error) => {
        if (error.message.includes("No User found")) {
          setError("No user found");
        } else if (
          error.message.includes("You cannot play a game against yourself")
        ) {
          setError("You cannot play a game against yourself");
        } else {
          setError("An error occurred");
        }
      },
      onSuccess: (data: UserWithOpponents) => {
        onSelect(data);
        resetForm();
      },
    }
  );

  const queryClient = useQueryClient();
  const queryKey = getQueryKey(api.user.getByUsername, {
    username: searchString,
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value);
    setError("");
    if (isFetching) {
      void queryClient.cancelQueries(queryKey);
    }
  };

  const onSubmit = async () => {
    if (!searchString.length) return;
    await refetch();
    if (data) {
      onSelect(data);
      resetForm();
    }
  };

  return (
    <>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex w-full items-center space-x-2">
          <Input
            {...register("username", { required: true, onChange })}
            type="text"
            placeholder="Username"
            hasError={!!errors?.username || !!error}
          />
          <Button type="submit" disabled={!!isFetching}>
            {isFetching && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Search
          </Button>
        </div>
        {(errors.username?.type === "required" && (
          <span className="px-1 text-xs text-red-600">
            Username is required
          </span>
        )) ||
          (error && <span className="px-1 text-xs text-red-600">{error}</span>)}
      </form>
      {!!users?.length && (
        <div className="w-full">
          <h3 className="mt-6 mb-2 block text-sm font-medium text-gray-900">
            Opponents
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {users.map((user) => {
              return (
                <li key={user?.id} className="">
                  <UserSearchFormItem
                    user={user}
                    onRemove={(user: UserWithOpponents) => onRemove(user)}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}
