import { LoginStore } from "@/types/zustand.type";
import { create } from "zustand";

//현재 시간을 기반으로 loginStateKey를 갱신
export const useLoginStore = create<LoginStore>((set) => ({
  loginStateKey: Date.now(),
  updateLoginStateKey: () => set({ loginStateKey: Date.now() }),
}));
