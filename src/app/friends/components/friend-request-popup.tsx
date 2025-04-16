"use client";

import { HeartHandshake, X } from "lucide-react";
import { FriendRequestPopUpProps } from "../type";
import { getUserForClient } from "@/services/user-client-service";
import { useSendFriendRequestMutation } from "@/hooks/mutations/use-send-friend-request-mutation";
import EmotionImage from "@/ui/common/emotion-image.common";
import EMOTION_COOKIE_IMAGE_URL from "@/constants/emotions-url.constant";

const FriendrequestPopUp = ({ user, onClose }: FriendRequestPopUpProps) => {
  const { userId } = getUserForClient();
  const { mutate: sendRequest } = useSendFriendRequestMutation();

  const handleSendRequest = () => {
    if (!userId) return;
    sendRequest({ senderUid: userId, receiverUid: user.user_uid });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-80 z-50">
      <div className="border w-80 bg-white p-6 rounded-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 p-2">
          <X size={18} />
        </button>
        <div className="flex items-center gap-2 mb-2 -mt-1">
          {/* 쿠키 들어갈 자리 */}
          <EmotionImage src={EMOTION_COOKIE_IMAGE_URL.JOY} size="xs" />
          <h1 className="text-lg text-grey-6 font-semibold">
            {user.user_nickname}
          </h1>
        </div>
        <div className="border-t" />
        <p className="text-center text-sm text-gray-500 my-5">
          {user.user_nickname} 님께
          <br />
          친구 요청을 보낼까요?
        </p>
        <button
          onClick={handleSendRequest}
          className="w-full bg-primary-300 hover:bg-secondary-300 transition-all duration-300 text-white font-medium py-2 rounded-xl flex justify-center items-center gap-2"
        >
          <HeartHandshake size={20} />
          친구 요청
        </button>
      </div>
    </div>
  );
};

export default FriendrequestPopUp;
