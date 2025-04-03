import { EMOTION_URL } from "@/constants/emotions-url";
import supabase from "@/services/supabase";

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

export const getPostEmotionByUserId = async () => {
  // 유저 정보 가져와서 비교할 예정
  /* const { data: User, error: UserError } = await supabase.auth.getUser();
  if (UserError) {
    console.log("오류남" + UserError);
  } else {
    console.log(User);
  }
 */

  try {
    const { data, error } = await supabase.from("posts").select("*");
    //.eq("user_id", a);

    if (error) {
      throw error;
    }
    return data;
  } catch (err) {
    console.error("데이터 가져오기 실패:", err);
    return [];
  }
};

export const checkEmotion = (emotion: string) => {
  return emotions[emotion] || "존재하지 않는 감정이예요";
};
