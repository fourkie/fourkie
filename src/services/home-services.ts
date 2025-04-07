import supabaseServer from "./supabase-server";
import supabase from "./supabase-client";
import { TOAST_MESSAGE } from "@/constants/toast-message";

export const getUserId = async () => {
  const supabase2 = await supabaseServer();
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
      console.error(TOAST_MESSAGE.HOMEERROR, err);
      return [];
    }
  }
};
