import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { shallow } from "zustand/shallow";

interface DashboardState {
  searchString: string;
  actions: {
    setSearchString: (searchString: string) => void;
  };
}

const useDashboardStore = create(
  immer<DashboardState>((set) => ({
    searchString: "",
    actions: {
      setSearchString: (searchString) => set({ searchString }),
    },
  }))
);

export const useDashboardState = () =>
  useDashboardStore(
    (state) => ({
      searchString: state.searchString,
      actions: state.actions,
    }),
    shallow,
  );
