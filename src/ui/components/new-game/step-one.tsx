import type { KeyboardEvent } from "react";
import { Input, Button } from "@/ui/primitives";
import { useNewGameState, useNewGameCanContinue } from "@/ui/state/newGame";
import { getUsersByUsername } from "@/ui/queries/users";
import UserSearchForm from "../user-search-form";
import type { SimpleUser } from "@/types";
import type { CurrentStepType } from "@/ui/state/newGame";

export default function NewGameStepOne() {
  const { title, actions, selectedUserUsernames, currentStep } =
    useNewGameState();

  const userQueries = getUsersByUsername(selectedUserUsernames);
  const userList = userQueries.map((query) => query.data) as SimpleUser[];

  const canContinue = useNewGameCanContinue();

  const onKeyUp = (event: KeyboardEvent) => {
    if (event.key === "Enter" && canContinue) {
      actions.setCurrentStep((1 + currentStep) as CurrentStepType);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-10">
      <div className="px-2">
        <div className="mb-6 max-w-2xl">
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            What would you like to call this game?
          </label>
          <Input
            value={title}
            onKeyUp={onKeyUp}
            onChange={(event) => actions.setTitle(event.target.value)}
            type="title"
            id="title"
            placeholder="Title"
          />
        </div>
        <div className="mb-6 max-w-2xl">
          <label
            htmlFor="opponents"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Who would you like to play against?
          </label>
          <UserSearchForm
            users={userList}
            onSelect={(user: SimpleUser) => actions.addUser(user)}
            onRemove={(user: SimpleUser) => actions.removeUser(user)}
          />
        </div>
        <div className="mb-6 max-w-2xl">
          <Button
            onClick={() =>
              actions.setCurrentStep((1 + currentStep) as CurrentStepType)
            }
            disabled={!canContinue}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
