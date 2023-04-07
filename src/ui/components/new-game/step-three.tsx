import type { SimpleUser } from "@/types";
import { api } from "@/lib/api";
import { Button, Icons } from "@/ui/primitives";
import { getUsersByUsername } from "@/ui/queries/users";
import { useNewGameState } from "@/ui/state/newGame";

export default function NewGameStepThree() {
  const { title, gameType, gameTypeMeta, selectedUserUsernames } =
    useNewGameState();

  const userQueries = getUsersByUsername(selectedUserUsernames);
  const userList = userQueries.map((query) => query.data) as SimpleUser[];

  const { mutate, isLoading } = api.game.create.useMutation({
    onError: (error) => {
      console.log(error);
    },
  });

  const onCreate = () => {
    mutate({
      title,
      gameType,
      gameTypeMeta,
      usernames: selectedUserUsernames,
    });
  };

  return (
    <div className="grid grid-cols-1 gap-10">
      <div className="px-2">
        <div className="mb-2">
          <h3 className="text-md mb-2 block font-medium text-gray-900">
            Summary
          </h3>
          <label className="mb-2 block text-sm font-medium text-gray-900">
            Title
          </label>
          <p className="">{title}</p>

          <label className="mb-2 block text-sm font-medium text-gray-900">
            Game Type
          </label>
          <p className="">{gameType}</p>

          <label className="mb-2 block text-sm font-medium text-gray-900">
            Game Type Meta
          </label>
          <p className="">{gameTypeMeta}</p>

          <label className="mb-2 block text-sm font-medium text-gray-900">
            Users
          </label>
          {userList && (
            <p className="">
              {userList.map((user: SimpleUser) => user.username)}
            </p>
          )}
          <Button onClick={onCreate} type="submit" disabled={!!isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
