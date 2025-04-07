import { TOAST_MESSAGE } from "@/constants/toast-message";
import supabaseClient from "./supabase-client";

export const getPostEmotionByUserId = async (userId: string | undefined) => {
  if (userId === undefined) {
    return false;
  } else {
    try {
      const { data, error } = await supabaseClient
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
