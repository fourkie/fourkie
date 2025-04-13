import { EMOTION_KR_TO_EN } from "@/constants/emotion.constant";

// 감정 이름을 영어로 변환
export const convertEmotions = (emotion: string): string => {
  return EMOTION_KR_TO_EN[emotion];
};
