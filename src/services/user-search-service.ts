import { TOAST_MESSAGE } from "@/constants/toast-message.constant";
import createClient from "./supabase-client-service";
import { toast } from "react-toastify";

export const searchUserByNicknameOrEmail = async (searchKeyword: string) => {
  const supabaseClient = createClient();

  try {
    const { data, error } = await supabaseClient
      .from("users")
      .select("user_uid, user_nickname, user_email")
      .or(`user_nickname.eq.${searchKeyword},user_email.eq.${searchKeyword}`)
      .single();

    if (error) throw new Error(TOAST_MESSAGE.MYPAGE.SEARCH_ERROR);
    return data;
  } catch (error) {
    toast.error(TOAST_MESSAGE.MYPAGE.SEARCH_ERROR);
    return null;
  }
};
