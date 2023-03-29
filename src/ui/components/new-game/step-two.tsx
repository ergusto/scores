import { useNewGameState, useNewGameCanContinue } from "@/ui/state/newGame";
import { ContentChoices } from "@/ui/primitives/content-choices";


export default function NewGameStepTwo() {
  const { 
    actions
  } = useNewGameState();
  const canContinue = useNewGameCanContinue();

    const first_to = {
      id: 'FIRST_TO',
      title: 'First to',
      text: 'First player to this score wins the game',
      callback: () => actions.setGameType(first_to.id),
    };
    const score_after = {
      id: 'SCORE_AFTER',
      title: 'Score after',
      text: 'Player with the highest score after this number of hands wins',
      callback: () => null,
    };

    

  return (
    <div className="grid grid-cols-1 gap-10">
			<div className="px-2">
				<div className="mb-6">
					<label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Select the game type</label>
				</div>
				<div className="mb-6 max-w-2xl">
          <ContentChoices choices={choices} />
        </div>
      </div>
    </div>
  );
}
