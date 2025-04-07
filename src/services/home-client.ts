import { TOAST_MESSAGE } from "@/constants/toast-message";
import supabaseClient from "./supabase-client";

export const getPostEmotionByUserId = async (
  userId: string | undefined,
  year: number,
  month: number,
) => {
  if (userId === undefined) {
    return false;
  } else {
    let dateBefore = "";
    let dateAfter = "";
    if (month < 10) {
      dateBefore = year + "-0" + month;
      if (month === 9) {
        dateAfter = year + "-" + month + 1;
      } else {
        dateAfter = year + "-0" + month;
      }
    } else {
      dateBefore = year + "-" + month;
    }
    try {
      const start = new Date(`${dateBefore}-01T00:00:00.000Z`).toISOString();
      const end = new Date(`${dateAfter}-01T00:00:00.000Z`).toISOString();

      const { data, error } = await supabaseClient
        .from("posts")
        .select("*")
        .gte("post_created_at", start)
        .lt("post_created_at", end)
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
