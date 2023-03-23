import { Input, Button } from "@/ui/primitives";
import { useNewGameState, useNewGameStepProgress } from "@/stores/newGame";
import UserSearchForm from "../user-search-form";
import type { SimpleUser } from "@/types";

export default function NewGameStepOne() {
  const { 
    title,
    gameType,
    gameTypeMeta,
    users,
    actions,
    currentStep
  } = useNewGameState();

  const canContinueMap = useNewGameStepProgress();
  const canContinue = canContinueMap[currentStep];

  return (
    <div className="grid grid-cols-2 gap-10">
			<div className="px-2">
				<div className="mb-6">
					<label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">What would you like to call this game?</label>
					<Input value={title} onChange={event => actions.setTitle(event.target.value)} type="title" id="title" placeholder="Title" />
				</div>
				<div className="mb-6">
					<label htmlFor="opponents" className="block mb-2 text-sm font-medium text-gray-900">Who would you like to play against?</label>
          <UserSearchForm onSelect={(user: SimpleUser) => actions.addUser(user)} />
				</div>
				<div className="mb-6">
          <Button disabled={!canContinue}>
						Continue
          </Button>
				</div>
			</div>
		</div>
  );
}