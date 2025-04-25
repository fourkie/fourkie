"use client";

import EMOTION_COOKIE_IMAGE_URL from "@/constants/emotions-url.constant";
import { TOAST_MESSAGE } from "@/constants/toast-message.constant";
import { useSendFriendRequestMutation } from "@/hooks/mutations/use-send-friend-request-mutation";
import { checkExistFriendRequest } from "@/services/friend-request-service";
import { getUserForClient } from "@/services/user-client-service";
import EmotionImage from "@/ui/common/emotion-image.common";
import Popup from "@/ui/common/popup-bg.common";
import { HeartHandshake, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FriendRequestPopUpProps } from "../type";

const FriendrequestPopUp = ({ user, onClose }: FriendRequestPopUpProps) => {
  const [userId, setUserId] = useState<string>("");
  useEffect(() => {
    const fetchUserId = async () => {
      const result = await getUserForClient();
      if (result) setUserId(result.userId);
    };

    fetchUserId();
  }, []);

  const { mutate: sendRequest } = useSendFriendRequestMutation();

  const handleSendRequest = async () => {
    if (!userId) return;

    const alreadyRequested = await checkExistFriendRequest({
      senderUid: userId,
      receiverUid: user.user_uid,
    });

    if (alreadyRequested) {
      toast.error(TOAST_MESSAGE.MYPAGE.FRIEND_REQUEST_EXIST);
      return;
    }

    sendRequest({ userId, receiverUid: user.user_uid });
    onClose();
  };

  return (
    <Popup>
      <div className="relative w-80 rounded-2xl border bg-white p-6">
        <button onClick={onClose} className="absolute right-4 top-4 p-2">
          <X size={18} />
        </button>
        <div className="-mt-1 mb-2 flex items-center gap-2">
          {/* 쿠키 들어갈 자리 */}
          <EmotionImage src={EMOTION_COOKIE_IMAGE_URL.JOY} size="xs" />
          <h1 className="text-lg font-semibold text-grey-6">
            {user.user_nickname}
          </h1>
        </div>
        <div className="border-t" />
        <p className="my-5 text-center text-sm text-gray-500">
          {user.user_nickname} 님께
          <br />
          친구 요청을 보낼까요?
        </p>
        <button
          onClick={handleSendRequest}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-300 py-2 font-medium text-white transition-all duration-300 hover:bg-secondary-300"
        >
          <HeartHandshake size={20} />
          친구 요청
        </button>
      </div>
    </Popup>
  );
};

export default FriendrequestPopUp;
