import { EMOTION_COOKIES } from "./emotion.constant";

const url = (emotion: string) => {
  return `https://kcvtuvflabmysoqvvany.supabase.co/storage/v1/object/public/emotion-img//${emotion}.png`;
};

const EMOTION_COOKIE_IMAGE_URL = {
  JOY: url(EMOTION_COOKIES.JOY),
  EXCITED: url(EMOTION_COOKIES.EXCITED),
  BUTTERFLY: url(EMOTION_COOKIES.BUTTERFLY),
  GRATEFUL: url(EMOTION_COOKIES.GRATEFUL),
  CALM: url(EMOTION_COOKIES.CALM),
  LONELY: url(EMOTION_COOKIES.LONELY),
  ANXIOUS: url(EMOTION_COOKIES.ANXIOUS),
  TIRED: url(EMOTION_COOKIES.TIRED),
  SAD: url(EMOTION_COOKIES.SAD),
  ANGRY: url(EMOTION_COOKIES.ANGRY),
};

export default EMOTION_COOKIE_IMAGE_URL;
