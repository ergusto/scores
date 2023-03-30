import { ChangeEvent } from "react";
import { Input, Button } from "@/ui/primitives";
import { useNewGameState, useNewGameCanContinue } from "@/ui/state/newGame";
import { ContentChoices } from "@/ui/primitives/content-choices";
import { CurrentStepType, FIRST_TO, SCORE_AFTER } from "./types";

export default function NewGameStepTwo() {
  const { 
    currentStep,
    gameType,
    gameTypeMeta,
    actions
  } = useNewGameState();

  const canContinue = useNewGameCanContinue();

  const first_to = {
    id: FIRST_TO,
    title: 'First to',
    text: 'First player to this score wins the game',
    isActive: gameType === FIRST_TO,
    callback: () => actions.setGameType(FIRST_TO),
  };
  const score_after = {
    id: SCORE_AFTER,
    title: 'Score after',
    text: 'Player with the highest score after this number of hands wins',
    isActive: gameType === SCORE_AFTER,
    callback: () => actions.setGameType(SCORE_AFTER),
  };

  const choices = [first_to, score_after];

  const onKeyUp = (event: KeyboardEvent)  => {
    if (event.key === "Enter" && canContinue) {
      actions.setCurrentStep((1 + currentStep as CurrentStepType));
    }
  };

  const onChange = (value: number) => {
    actions.setGameTypeMeta(value);
  };

  const gameTypeMetaLabel = gameType === FIRST_TO ? 'Score to reach' : 'Number of hands to play';

  return (
    <div className="grid grid-cols-1 gap-10">
			<div className="px-2">
				<div className="mb-2">
					<label htmlFor="choices" className="block mb-2 text-sm font-medium text-gray-900">Select the game type</label>
				</div>
				<div className="mb-6 max-w-2xl">
          <ContentChoices choices={choices} />
        </div>
        <div className="mb-6 max-w-2xl">
					<label htmlFor="game_type_meta" className="block mb-2 text-sm font-medium text-gray-900">{gameTypeMetaLabel}</label>
					<Input value={gameTypeMeta} onKeyUp={onKeyUp} onChange={(event: ChangeEvent<HTMLInputElement>): void => onChange(event.target.value)} type="number" id="title" placeholder={gameTypeMetaLabel} />
        </div>
        <div className="mb-6">
          <Button onClick={() => actions.setCurrentStep((1 + currentStep as CurrentStepType))} disabled={!canContinue}>
						Continue
          </Button>
				</div>
      </div>
    </div>
  );
}
