import { TOAST_MESSAGE } from "@/constants/toast-message.constant";
import createClient from "./supabase-client-service";
import { toast } from "react-toastify";

export const getUserNickname = async () => {
  const supabaseClient = createClient();

  try {
    const {
      data: { user },
      error,
    } = await supabaseClient.auth.getUser();

    if (error || !user?.id) {
      throw new Error(TOAST_MESSAGE.ERROR.AUTH_ERROR);
    }

    const { data, error: nicknameError } = await supabaseClient
      .from("users")
      .select("user_nickname")
      .eq("user_uid", user.id)
      .single();

    if (nicknameError) {
      throw new Error(TOAST_MESSAGE.MYPAGE.GET_NICKNAME_ERROR);
    }
    return data?.user_nickname;
  } catch {
    toast.error(TOAST_MESSAGE.MYPAGE.GET_NICKNAME_ERROR);
  }
};

// 닉네임 수정하기
export const upDateMyNickname = async (newNickname: string) => {
  const supabaseClient = createClient();

  try {
    const {
      data: { user },
      error,
    } = await supabaseClient.auth.getUser();

    if (error || !user?.id) {
      throw new Error(TOAST_MESSAGE.ERROR.AUTH_ERROR);
    }

    const { error: updateNicknameError } = await supabaseClient
      .from("users")
      .update({ user_nickname: newNickname })
      .eq("user_uid", user.id);

    if (updateNicknameError) {
      throw new Error(TOAST_MESSAGE.MYPAGE.CHANGE_NICKNAME_ERROR);
    }
  } catch {
    toast.error(TOAST_MESSAGE.MYPAGE.CHANGE_NICKNAME_ERROR);
  }
};

// 닉네임 중복 확인하기
export const checkNicknameDuplicate = async (nickname: string) => {
  const supabaseClient = createClient();

  try {
    const { data } = await supabaseClient
      .from("users")
      .select("user_uid")
      .eq("user_nickname", nickname)
      .single();

    return !!data;
  } catch {
    toast.error(TOAST_MESSAGE.MYPAGE.EXIST_NICKNAME_ERROR);
    return true;
  }
};
