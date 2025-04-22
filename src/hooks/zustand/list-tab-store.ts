import { create } from "zustand";

interface ListTab {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}

export const useTabStore = create<ListTab>((set) => ({
  selectedTab: 'my',
  setSelectedTab: (tab: string) => set({ selectedTab: tab }),
}));

