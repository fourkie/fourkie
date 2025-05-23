import { EmotionKey } from "@/constants/emotion.constant";

export type Posts = {
  post_id: number;
  user_id: string;
  post_title: string;
  post_content: string;
  post_emotion: EmotionKey;
  post_created_at: string;
};
