import { TOAST_MESSAGE } from "@/constants/toast-message.constant";
import supabaseClient from "./supabase-client-service";
import { QUERYDATA } from "@/constants/query-data.constant";
import { QUERY_KEY } from "@/constants/query-keys.constant";

export const getPostEmotionByUserId = async (
  userId: string | undefined,
  year: number,
  month: number,
) => {
  const supabase = supabaseClient();
  if (userId === undefined) {
    return false;
  } else {
    const dateBefore = `${year}-${month.toString().padStart(2, "0")}`;
    let nextMonth = month + 1;
    let nextYear = year;
    if (nextMonth > 12) {
      nextMonth = 1;
      nextYear += 1;
    }
    const dateAfter = `${nextYear}-${nextMonth.toString().padStart(2, "0")}`;
    try {
      const start = new Date(`${dateBefore}-01T00:00:00.000Z`).toISOString();
      const end = new Date(`${dateAfter}-01T00:00:00.000Z`).toISOString();

      const { data, error } = await supabase
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

export const getUserNickname = async (userId: string | undefined) => {
  if (!userId) {
    console.log(QUERY_KEY.NICKNAME + QUERYDATA.ISERROR);
    return undefined;
  }
  const supabase = supabaseClient();
  const { data: nickname, error } = await supabase
    .from("users")
    .select("user_nickname")
    .eq("user_id", userId)
    .single();

  if (error) {
    console.log(QUERY_KEY.NICKNAME + QUERYDATA.ISERROR);
    return undefined;
  }

  return nickname;
};
