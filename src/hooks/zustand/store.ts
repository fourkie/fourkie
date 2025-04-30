import { LoginStore } from "@/types/zustand.type";
import { create } from "zustand";

export const useLoginStore = create<LoginStore>((set) => ({
  loginStateKey: Date.now(),
  updateLoginStateKey: () => set({ loginStateKey: Date.now() }),
}));
