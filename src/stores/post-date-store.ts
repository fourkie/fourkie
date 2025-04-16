import { create } from "zustand";

interface PostDate {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
}

export const usePostStore = create<PostDate>((set) => ({
  selectedDate: new Date().toISOString().split("T")[0],
  setSelectedDate: (date: string) => set({ selectedDate: date }),
}));
