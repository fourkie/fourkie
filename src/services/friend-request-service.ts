import { toast } from "react-toastify";
import createClient from "./supabase-client-service";
import { TOAST_MESSAGE } from "@/constants/toast-message.constant";

// 친구 요청 supabase 에 저장
export const sendFriendRequest = async ({
  userId,
  receiverUid,
}: {
  userId: string;
  receiverUid: string;
}) => {
  const supabaseClient = createClient();

  try {
    const { data, error } = await supabaseClient.from("friends").insert([
      {
        sender_uid: userId,
        receiver_uid: receiverUid,
        accepted: false,
      },
    ]);

    if (error) throw new Error(TOAST_MESSAGE.MYPAGE.FRIEND_REQUEST_ERROR);
    return data;
  } catch {
    toast.error(TOAST_MESSAGE.MYPAGE.FRIEND_REQUEST_ERROR);
    return [];
  }
};

// 친구 요청 중복 여부 확인
export const checkExistFriendRequest = async ({
  senderUid,
  receiverUid,
}: {
  senderUid: string;
  receiverUid: string;
}) => {
  const supabaseClient = createClient();

  try {
    const { data, error } = await supabaseClient
      .from("friends")
      .select("id")
      .eq("sender_uid", senderUid)
      .eq("receiver_uid", receiverUid)
      .maybeSingle();

    if (error) throw new Error(TOAST_MESSAGE.MYPAGE.SEARCH_ERROR);

    return !!data;
  } catch (error) {
    toast.error(TOAST_MESSAGE.MYPAGE.SEARCH_ERROR);
    return false;
  }
};

// 받은 친구 요청 목록 조회
export const getReceivedRequests = async (userId: string) => {
  const supabaseClient = createClient();

  try {
    const { data, error } = await supabaseClient
      .from("friends")
      .select("*, users:sender_uid(user_uid,user_nickname)")
      .eq("receiver_uid", userId)
      .eq("accepted", false);

    if (error) throw new Error(TOAST_MESSAGE.MYPAGE.FRIEND_RECEIVED_ERROR);
    return data;
  } catch {
    toast.error(TOAST_MESSAGE.MYPAGE.FRIEND_RECEIVED_ERROR);
    return [];
  }
};

// 보낸 친구 요청 목록 조회
export const getSentRequests = async (userId: string) => {
  const supabaseClient = createClient();

  try {
    const { data, error } = await supabaseClient
      .from("friends")
      .select("*, users:receiver_uid(user_uid, user_nickname)")
      .eq("sender_uid", userId)
      .eq("accepted", false);

    if (error) throw new Error(TOAST_MESSAGE.MYPAGE.FRIEND_SENT_ERROR);
    return data;
  } catch {
    toast.error(TOAST_MESSAGE.MYPAGE.FRIEND_SENT_ERROR);
    return [];
  }
};

// 친구 요청 수락하기
export const acceptFriendRequest = async (requestId: number) => {
  const supabaseClient = createClient();

  try {
    const { data, error } = await supabaseClient
      .from("friends")
      .update({ accepted: true })
      .eq("id", requestId);

    if (error) throw new Error(TOAST_MESSAGE.MYPAGE.FRIEND_ACCEPT_ERROR);
    return data;
  } catch {
    toast.error(TOAST_MESSAGE.MYPAGE.FRIEND_ACCEPT_ERROR);
    return [];
  }
};

// 손절하기
export const deleteFriend = async ({
  userId,
  friendUid,
}: {
  userId: string;
  friendUid: string;
}) => {
  const supabaseClient = createClient();

  try {
    const { error } = await supabaseClient
      .from("friends")
      .delete()
      .or(
        `and(sender_uid.eq.${userId},receiver_uid.eq.${friendUid}),and(sender_uid.eq.${friendUid},receiver_uid.eq.${userId})`,
      );

    if (error) throw new Error(TOAST_MESSAGE.MYPAGE.FRIEND_DELETE_ERROR);
  } catch (error) {
    toast.error(TOAST_MESSAGE.MYPAGE.FRIEND_DELETE_ERROR);
    throw error;
  }
};
