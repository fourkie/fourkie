import { PostingState } from "@/types/zustand.type";
import { create } from "zustand";

export const usePostingStore = create<PostingState>((set) => ({
  inputTitle: "",
  inputContent: "",
  setInputTitle: (value) => set({ inputTitle: value }),
  setInputContent: (value) => set({ inputContent: value }),
}));
