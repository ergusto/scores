import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { shallow } from "zustand/shallow";

interface GameDetailState {
  showGameEndModal: boolean;
  actions: {
    showModal: () => void;
  }
}

const useGameDetailStore = create(
  immer<GameDetailState>((set) => ({
    showGameEndModal: false,
    actions: {
      showModal: () => set({ showGameEndModal: true }),
    }
  }))
);

export const useGameDetailState = () =>
  useGameDetailStore(
    (state) => ({
      showGameEndModal: state.showGameEndModal,
      actions: state.actions,
    }),
    shallow,
  );
