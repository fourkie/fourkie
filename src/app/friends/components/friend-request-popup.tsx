"use client";

import EMOTION_COOKIE_IMAGE_URL from "@/constants/emotions-url.constant";
import { useAcceptFriendRequestMutation } from "@/hooks/mutations/use-accept-friend-request-mutation";
import { useSendFriendRequestMutation } from "@/hooks/mutations/use-send-friend-request-mutation";
import { useGetReceivedRequestQuery } from "@/hooks/queries/use-get-received-requests-query";
import { getUserForClient } from "@/services/user-client-service";
import EmotionImage from "@/ui/common/emotion-image.common";
import Popup from "@/ui/common/popup-bg.common";
import { HeartHandshake, X } from "lucide-react";
import { useEffect, useState } from "react";
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
  const { mutate: acceptRequest } = useAcceptFriendRequestMutation();

  const { data: receivedRequests = [] } = useGetReceivedRequestQuery(userId);

  const alreadyReceived = receivedRequests.some(
    (request) => request.sender_uid === user.user_uid,
  );

  const handleRequestPopup = () => {
    if (!userId) return;

    if (alreadyReceived) {
      const receivedRequest = receivedRequests.find(
        (request) => request.sender_uid === user.user_uid,
      );
      if (receivedRequest) {
        acceptRequest(receivedRequest.id);
        onClose();
      }
    } else {
      sendRequest({ userId, receiverUid: user.user_uid });
      onClose();
    }
  };

  return (
    <Popup>
      <div
        className="relative w-80 rounded-2xl border bg-white p-6"
        aria-label="친구 수락 및 요청"
      >
        <button onClick={onClose} className="absolute right-4 top-4 p-2">
          <X size={18} />
        </button>
        <div className="-mt-1 mb-2 flex items-center gap-2">
          <EmotionImage src={EMOTION_COOKIE_IMAGE_URL.JOY} size="xs" />
          <h1 className="text-lg font-semibold text-grey-6">
            {user.user_nickname}
          </h1>
        </div>
        <div className="border-t" />
        <p className="my-5 text-center text-sm text-grey-6">
          {alreadyReceived ? (
            <>
              <span className="font-semibold text-primary-300">
                {user.user_nickname}
              </span>
              님이 이미 요청을 보내셨어요!
              <br />
              요청을 수락할까요?
            </>
          ) : (
            <>
              <span className="font-semibold text-primary-300">
                {user.user_nickname}
              </span>
              님께 <br /> 친구 요청을 보낼까요?
            </>
          )}
        </p>
        <button
          onClick={handleRequestPopup}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-300 py-2 font-medium text-white transition-all duration-300 hover:bg-secondary-300"
        >
          <HeartHandshake size={20} />
          {alreadyReceived ? "요청 수락" : "친구 요청"}
        </button>
      </div>
    </Popup>
  );
};

export default FriendrequestPopUp;
