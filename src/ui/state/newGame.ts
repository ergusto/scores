import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { shallow } from "zustand/shallow";
import { GameType } from "@prisma/client";

import type { SimpleUser } from "@/types";

export type CurrentStepType = 1 | 2 | 3;

export type FirstToGameType = typeof GameType.FIRST_TO;

export type ScoreAfterGameType = typeof GameType.SCORE_AFTER;

export type Step = {
  title: string;
  number: CurrentStepType;
  component: React.FunctionComponent;
};

interface NewGameState {
  currentStep: CurrentStepType;
  title: string;
  gameType: GameType;
  gameTypeMeta: number | null;
  selectedUserUsernames: string[];
  actions: {
    setCurrentStep: (currentStep: CurrentStepType) => void;
    setTitle: (title: string) => void;
    setGameType: (gameType: GameType) => void;
    setGameTypeMeta: (gameTypeMeta: number) => void;
    addUser: (user: SimpleUser) => void;
    removeUser: (user: SimpleUser) => void;
  };
}

const useNewGameStore = create(
  immer<NewGameState>((set) => ({
    currentStep: 1,
    title: "",
    gameType: GameType.FIRST_TO,
    gameTypeMeta: null,
    selectedUserUsernames: [],
    actions: {
      setCurrentStep: (currentStep) => set({ currentStep }),
      setTitle: (title) => set({ title }),
      setGameType: (gameType) => set({ gameType }),
      setGameTypeMeta: (gameTypeMeta) => set({ gameTypeMeta }),
      addUser(user: SimpleUser) {
        set((state) => {
          if (
            state.selectedUserUsernames.findIndex(
              (selectedUserUsername) => selectedUserUsername === user.username
            ) === -1
          ) {
            state.selectedUserUsernames.push(user.username as string);
          }
        });
      },
      removeUser(user) {
        set((state) => {
          state.selectedUserUsernames = state.selectedUserUsernames.filter(
            (username: string) => username !== user.username
          );
        });
      },
    },
  }))
);

export const useNewGameState = () =>
  useNewGameStore(
    (state) => ({
      currentStep: state.currentStep,
      title: state.title,
      gameType: state.gameType,
      gameTypeMeta: state.gameTypeMeta,
      selectedUserUsernames: state.selectedUserUsernames,
      actions: state.actions,
    }),
    shallow
  );

export const useNewGameCanContinue = () =>
  useNewGameStore((state) => {
    const {
      currentStep,
      title,
      selectedUserUsernames,
      gameType,
      gameTypeMeta,
    } = state;
    let canContinue = false;

    if (currentStep === 1) {
      canContinue = !!title.length && !!selectedUserUsernames.length;
    }

    if (currentStep === 2) {
      canContinue = !!gameType && !!gameTypeMeta;
    }

    return canContinue;
  }, shallow);

interface ProgressMap {
  [step: number]: boolean;
}

export const useNewGameStepProgress = () =>
  useNewGameStore((state) => {
    const { title, selectedUserUsernames, gameType, gameTypeMeta } = state;

    const step2CanContinue = !!title.length && !!selectedUserUsernames.length,
      step3CanContinue = !!gameType && !!gameTypeMeta;

    const progressMap: ProgressMap = {
      1: true,
      2: step2CanContinue,
      3: step2CanContinue && step3CanContinue,
    };

    return progressMap;
  }, shallow);
