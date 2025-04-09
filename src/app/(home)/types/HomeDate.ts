import { Dayjs } from "dayjs";

export type HomeDateProps = {
  currentDate: Dayjs;
  setCurrentDate: (date: Dayjs) => void;
};
