import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { shallow } from "zustand/shallow";

import type { HandScoreWithUser } from "@/types";

interface SimpleHandScore {
  score: number;
  user: {
    id: string;
  };
}

interface HandScoreMap {
  [key: string]: SimpleHandScore;
}

interface HandFormState {
  handScores: HandScoreMap;
  dealer?: string;
  actions: {
    addHandScore: (handScore: HandScoreWithUser) => void;
    removeHandSore: (handScore: HandScoreWithUser) => void;
  };
}

const useNewHandStore = create(
  immer<HandFormState>((set) => ({
    handScores: {},
    dealer: undefined,
    actions: {
      addHandScore(handScore: HandScoreWithUser) {
        set((state) => {
          state.handScores[handScore.user.id] = handScore;
        });
      },
      removeHandSore(handScore: HandScoreWithUser) {
        set((state) => {
          delete state.handScores[handScore.user.id];
        });
      },
    },
  }))
);

export const useNewHandState = () =>
  useNewHandStore(
    (state) => ({
      handScores: Object.keys(state.handScores).map(
        (key) => state.handScores[key]
      ),
      dealer: state?.dealer,
      actions: state.actions,
      isValid: true,
    }),
    shallow
  );
