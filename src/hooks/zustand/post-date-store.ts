import { create } from "zustand";

interface PostDate {
  selectedDate: string | null;
  setSelectedDate: (date: string | null) => void;
}

export const usePostStore = create<PostDate>((set) => ({
  selectedDate: null,
  setSelectedDate: (date: string | null) => set({ selectedDate: date }),
}));
