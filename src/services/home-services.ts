import supabase1 from "./supabase-server";
import supabase from "./supabase";

export const getUserId = async () => {
  const supabase2 = await supabase1();
  const {
    data: { user },
  } = await supabase2.auth.getUser();
  return user?.id;
};

export const getPostEmotionByUserId = async (userId: string | undefined) => {
  if (userId === undefined) {
    return false;
  } else {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("user_id", userId);

      if (error) {
        throw error;
      }
      return data;
    } catch (err) {
      console.error("데이터 가져오기 실패:", err);
      return [];
    }
  }
};
