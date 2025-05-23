import { Dayjs } from "dayjs";

export type HomeDateProps = {
  currentDate: Dayjs;
  setCurrentDate: (date: Dayjs) => void;
};

export type HomePost = {
  post_id: number;
  post_created_at: string;
  user_id: string;
  post_title: string;
  post_emotion: string;
  post_content: string;
};
