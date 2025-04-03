import { EMOTION_URL } from "@/constants/emotions-url";

const emotions: Record<string, string> = {
  JOY: EMOTION_URL.JOY,
  EXCITED: EMOTION_URL.EXCITED,
  BUTTERFLY: EMOTION_URL.BUTTERFLY,
  GRATEFUL: EMOTION_URL.GRATEFUL,
  CALM: EMOTION_URL.CALM,
  LONELY: EMOTION_URL.LONELY,
  ANXIOUS: EMOTION_URL.ANXIOUS,
  TIRED: EMOTION_URL.TIRED,
  SAD: EMOTION_URL.SAD,
  ANGRY: EMOTION_URL.ANGRY,
};

export const checkEmotion = (emotion: string) => {
  return emotions[emotion] || "존재하지 않는 감정이예요";
};
