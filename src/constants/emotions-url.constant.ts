import { EMOTIONS } from "./emotion";

const url = (emotion: string) => {
  return `https://kcvtuvflabmysoqvvany.supabase.co/storage/v1/object/public/emotion-img//${emotion}.png`;
};

const EMOTION_COOKIE_IMAGE_URL = {
  JOY: url(EMOTIONS.JOY),
  EXCITED: url(EMOTIONS.EXCITED),
  BUTTERFLY: url(EMOTIONS.BUTTERFLY),
  GRATEFUL: url(EMOTIONS.GRATEFUL),
  CALM: url(EMOTIONS.CALM),
  LONELY: url(EMOTIONS.LONELY),
  ANXIOUS: url(EMOTIONS.ANXIOUS),
  TIRED: url(EMOTIONS.TIRED),
  SAD: url(EMOTIONS.SAD),
  ANGRY: url(EMOTIONS.ANGRY),
};

export default EMOTION_COOKIE_IMAGE_URL;
