import { toast } from "react-toastify";
import createClient from "./supabase-client-service";
import { TOAST_MESSAGE } from "@/constants/toast-message.constant";

// 친구 요청 supabase 에 저장
export const sendFriendRequest = async ({
  senderUid,
  receiverUid,
}: {
  senderUid: string;
  receiverUid: string;
}) => {
  const supabaseClient = createClient();

  try {
    const { data, error } = await supabaseClient.from("friends").insert([
      {
        sender_uid: senderUid,
        receiver_uid: receiverUid,
        accepted: false,
      },
    ]);

    if (error) throw new Error(TOAST_MESSAGE.MYPAGE.FRIEND_REQUEST_ERROR);
    return data;
  } catch (error) {
    toast.error(TOAST_MESSAGE.MYPAGE.FRIEND_REQUEST_ERROR);
  }
};

// 받은 친구 요청 목록 조회
export const getReceivedRequests = async (userId: string) => {
  const supabaseClient = createClient();

  try {
    const { data, error } = await supabaseClient
      .from("friends")
      .select("*, users:sender_uid(users_uid,users_nickname)")
      .eq("receiver_uid", userId)
      .eq("accepted", false);

    if (error) throw new Error(TOAST_MESSAGE.MYPAGE.FRIEND_RECEIVED_ERROR);
    return data;
  } catch (error) {
    toast.error(TOAST_MESSAGE.MYPAGE.FRIEND_RECEIVED_ERROR);
  }
};

// 보낸 친구 요청 목록 조회
export const getSentRequests = async (userId: string) => {
  const supabaseClient = createClient();

  try {
    const { data, error } = await supabaseClient
      .from("friends")
      .select("*, users:receiver_uid(user_uid, user_nickname")
      .eq("sender_uid", userId)
      .eq("accepted", false);

    if (error) throw new Error(TOAST_MESSAGE.MYPAGE.FRIEND_SENT_ERROR);
    return data;
  } catch (error) {
    toast.error(TOAST_MESSAGE.MYPAGE.FRIEND_SENT_ERROR);
  }
};
