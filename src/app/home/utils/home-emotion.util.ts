import supabase from "@/services/supabase";

const emotions: Record<string, string> = {
  JOY: "😊",
  EXCITED: "🤩",
  BUTTERFLY: "🦋",
  GRATEFUL: "🙏",
  CALM: "😌",
  LONELY: "😔",
  ANXIOUS: "😰",
  TIRED: "😴",
  SAD: "😢",
  ANGRY: "😠",
};
export const getUserPostData = async () => {
  const { data: posts, error } = await supabase.from("posts").select("post_id");
  if (error) {
    return "오류";
  }
  return posts;
};

export const getEmotion = (emotion: string) => {
  return emotions[emotion] || "존재하지 않는 감정이예요";
};
