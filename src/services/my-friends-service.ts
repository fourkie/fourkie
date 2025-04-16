import { TOAST_MESSAGE } from "@/constants/toast-message.constant";
import { getFriendIds } from "./friend-service";
import createClient from "./supabase-client-service";
import { toast } from "react-toastify";

export const getMyFriends = async () => {
  const supabaseClient = createClient();

  try {
    const {
      data: { user },
      error,
    } = await supabaseClient.auth.getUser();

    if (error || !user?.id) {
      throw new Error(TOAST_MESSAGE.ERROR.AUTH_ERROR);
    }

    const friendIds = await getFriendIds({ userId: user.id });
    if (!friendIds || friendIds.length === 0) return [];

    const { data, error: friendError } = await supabaseClient
      .from("users")
      .select("user_uid, user_nickname")
      .in("user_uid", friendIds);

    if (friendError) throw friendError;
    return data;
  } catch {
    toast.error(TOAST_MESSAGE.MYPAGE.SEARCH_ERROR);
  }
};
