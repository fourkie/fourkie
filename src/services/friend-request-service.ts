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
