import supabase from "./supabase";

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
