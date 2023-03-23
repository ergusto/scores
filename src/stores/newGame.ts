import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { shallow } from "zustand/shallow";

import type { SimpleUser } from "@/types";
import type { CurrentStepType, GameTypeType } from "@/ui/components/new-game/types";

interface NewGameState {
  currentStep: CurrentStepType;
  title: string;
  gameType: GameTypeType;
  gameTypeMeta: number | null;
  users: SimpleUser[];
  actions: {
    setCurrentStep: (currentStep: CurrentStepType) => void,
    setTitle: (title: string) => void,
    setGameType: (gameType: GameTypeType) => void,
    setGameTypeMeta: (gameTypeMeta: number) => void,
    addUser: (user: SimpleUser) => void,
    removeUser: (user: SimpleUser) => void,
  }
}

const useNewGameStore = create(
  immer<NewGameState>((set) => ({
    currentStep: 1,
    title: "",
    gameType: "ft",
    gameTypeMeta: null,
    users: [],
    actions: {
      setCurrentStep: currentStep => set({ currentStep }),
      setTitle: title  => set({ title }),
      setGameType: gameType => set ({ gameType }),
      setGameTypeMeta: gameTypeMeta => set({ gameTypeMeta }),
      addUser(user: SimpleUser) {
        set(state => {
          state.users.push(user);
        });
      },
      removeUser(user) {
        set(state => {
          state.users.filter((obj: SimpleUser) => obj.id !== user.id);
        });
      },
    }
  }))
);

export const useNewGameState = () => useNewGameStore(
  state => ({
    currentStep: state.currentStep,
    title: state.title,
    gameType: state.gameType,
    gameTypeMeta: state.gameTypeMeta,
    users: state.users,
    actions: state.actions,
  }),
  shallow
);

export const useNewGameCanContinue = () => useNewGameStore(
  state => {
    const { currentStep, title, gameType, gameTypeMeta, users } = state;
    let canContinue = false;

    if (currentStep === 1) {
      canContinue = !!title.length && !!users.length;
    }

    return {
      canContinue
    };
  },
  shallow
);

interface ProgressMap {
  [step: number]: boolean;
}

export const useNewGameStepProgress = () => useNewGameStore(
  state => {
    const { title, gameType, gameTypeMeta, users } = state;

    const progressMap: ProgressMap = {
      1: !!title.length && !!users.length,
      2: false,
      3: false,
    };

    return progressMap;
  },
  shallow
)
