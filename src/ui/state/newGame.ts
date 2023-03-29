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
  selectedUserUsernames: string[];
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
    selectedUserUsernames: [],
    actions: {
      setCurrentStep: currentStep => set({ currentStep }),
      setTitle: title  => set({ title }),
      setGameType: gameType => set ({ gameType }),
      setGameTypeMeta: gameTypeMeta => set({ gameTypeMeta }),
      addUser(user: SimpleUser) {
        set(state => {
          if (state.selectedUserUsernames.findIndex(selectedUserUsername => selectedUserUsername === user.username) === -1) {
            state.selectedUserUsernames.push(user.username);
          }
        });
      },
      removeUser(user) {
        set(state => {
          state.selectedUserUsernames = state.selectedUserUsernames.filter((username: string) => username !== user.username);
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
    selectedUserUsernames: state.selectedUserUsernames,
    actions: state.actions,
  }),
  shallow
);

export const useNewGameCanContinue = () => useNewGameStore(
  state => {
    const { currentStep, title, selectedUserUsernames } = state;
    let canContinue = false;

    if (currentStep === 1) {
      canContinue = !!title.length && !!selectedUserUsernames.length;
    }

    return canContinue;
  },
  shallow
);

interface ProgressMap {
  [step: number]: boolean;
}

export const useNewGameStepProgress = () => useNewGameStore(
  state => {
    const { title, selectedUserUsernames } = state;

    const progressMap: ProgressMap = {
      1: true,
      2: !!title.length && !!selectedUserUsernames.length,
      3: false,
    };

    return progressMap;
  },
  shallow
)
