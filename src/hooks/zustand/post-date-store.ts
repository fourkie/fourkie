import dayjs from "dayjs";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PostDate {
  selectedDate: string | null;
  setSelectedDate: (date: string | null) => void;
}

export const usePostStore = create<PostDate>()(
  persist(
    (set) => ({
      selectedDate: dayjs().format("YYYY-MM-DD"),
      setSelectedDate: (date) => set({ selectedDate: date }),
    }),
    {
      name: "post-date-storage",
    },
  ),
);
