import { EMOTION_KR_TO_EN } from "@/constants/emotion.constant";

export const convertEmotions = (emotion: string): string => {
  return EMOTION_KR_TO_EN[emotion];
};
