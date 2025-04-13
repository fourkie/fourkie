// store/useLoginStore.ts
import { create } from "zustand";

interface LoginStore {
  loginStateKey: number;
  updateLoginStateKey: () => void;
}

export const useLoginStore = create<LoginStore>((set) => ({
  loginStateKey: Date.now(),
  updateLoginStateKey: () => set({ loginStateKey: Date.now() }),
}));
