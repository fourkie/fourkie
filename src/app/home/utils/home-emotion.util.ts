import supabase from "@/services/supabase";

// 쿠키 사진 url이 들어갈 예정
// 이거 상수 쪽으로
// cookieImg = { joy: "url" 이렇게 빼두는 게 좋겠죠?}
const emotions: Record<string, string> = {
  JOY: "https://kcvtuvflabmysoqvvany.supabase.co/storage/v1/object/public/emotion-img/joy.jpg",
  EXCITED:
    "https://kcvtuvflabmysoqvvany.supabase.co/storage/v1/object/public/emotion-img/joy.jpg",
  BUTTERFLY:
    "https://kcvtuvflabmysoqvvany.supabase.co/storage/v1/object/public/emotion-img/joy.jpg",
  GRATEFUL:
    "https://kcvtuvflabmysoqvvany.supabase.co/storage/v1/object/public/emotion-img/joy.jpg",
  CALM: "https://kcvtuvflabmysoqvvany.supabase.co/storage/v1/object/public/emotion-img/joy.jpg",
  LONELY:
    "https://kcvtuvflabmysoqvvany.supabase.co/storage/v1/object/public/emotion-img/joy.jpg",
  ANXIOUS:
    "https://kcvtuvflabmysoqvvany.supabase.co/storage/v1/object/public/emotion-img/sad.jpg",
  TIRED:
    "https://kcvtuvflabmysoqvvany.supabase.co/storage/v1/object/public/emotion-img/sleepy.jpg",
  SAD: "https://kcvtuvflabmysoqvvany.supabase.co/storage/v1/object/public/emotion-img/sad.jpg",
  ANGRY:
    "https://kcvtuvflabmysoqvvany.supabase.co/storage/v1/object/public/emotion-img/surprize.jpg",
};

export const getUserEmotions = async () => {
  // 유저 정보 가져와서 비교할 예정
  /* const { data: User, error: UserError } = await supabase.auth.getUser();
  if (UserError) {
    console.log("오류남" + UserError);
  } else {
    console.log(User);
  }
 */
  const { data, error } = await supabase.from("posts").select("*");
  //.eq("user_id", a);

  if (error) {
    console.error("데이터 가져오기 실패:", error);
    return [];
  }
  return data;
};

export const checkEmotion = (emotion: string) => {
  return emotions[emotion] || "존재하지 않는 감정이예요";
};
