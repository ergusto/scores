import type { ChangeEvent, KeyboardEvent } from "react";
import { Input, Button } from "@/ui/primitives";
import {
  useNewGameState,
  useNewGameCanContinue,
  type CurrentStepType,
} from "@/ui/state/newGame";
import { GameType } from "@prisma/client";
import { ContentChoices } from "@/ui/primitives/content-choices";

export default function NewGameStepTwo() {
  const { currentStep, gameType, gameTypeMeta, actions } = useNewGameState();

  const canContinue = useNewGameCanContinue();

  const first_to = {
    id: GameType.FIRST_TO,
    title: "First to",
    text: "First player to this score wins the game",
    isActive: gameType === GameType.FIRST_TO,
    callback: () => actions.setGameType(GameType.FIRST_TO),
  };

  const score_after = {
    id: GameType.SCORE_AFTER,
    title: "Score after",
    text: "Player with the highest score after this number of hands wins",
    isActive: gameType === GameType.SCORE_AFTER,
    callback: () => actions.setGameType(GameType.SCORE_AFTER),
  };

  const choices = [first_to, score_after];

  const onKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && canContinue) {
      actions.setCurrentStep((1 + currentStep) as CurrentStepType);
    }
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const element = event.currentTarget as HTMLInputElement;
    const value = element.value;
    actions.setGameTypeMeta(Number(value));
  };

  const gameTypeMetaLabel =
    gameType === GameType.FIRST_TO
      ? "Score to reach"
      : "Number of hands to play";

  return (
    <div className="grid grid-cols-1 gap-10">
      <div className="px-2">
        <div className="mb-2">
          <label
            htmlFor="choices"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Select the game type
          </label>
        </div>
        <div className="mb-6 max-w-2xl">
          <ContentChoices choices={choices} selectedChoice={gameType} />
        </div>
        <div className="mb-6 max-w-2xl">
          <label
            htmlFor="game_type_meta"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            {gameTypeMetaLabel}
          </label>
          <Input
            id="title"
            type="number"
            value={String(gameTypeMeta)}
            onKeyUp={onKeyUp}
            onChange={onChange}
            placeholder={gameTypeMetaLabel}
          />
        </div>
        <div className="mb-6">
          <Button
            onClick={() =>
              actions.setCurrentStep((1 + currentStep) as CurrentStepType)
            }
            disabled={!canContinue}
          >
            Confirm
          </Button>
          <Button
            className="ml-4"
            variant="ghost"
            onClick={() => {
              actions.setCurrentStep((currentStep - 1) as CurrentStepType);
            }}
          >
            back
          </Button>
        </div>
      </div>
    </div>
  );
}
