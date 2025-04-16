"use client";

import EMOTION_COOKIE_IMAGE_URL from "@/constants/emotions-url.constant";
import { TOAST_MESSAGE } from "@/constants/toast-message.constant";
import { UI_TEXT } from "@/constants/ui-text";
import { useAcceptFriendRequestMutation } from "@/hooks/mutations/use-accept-friend-request-mutation";
import { useGetReceivedRequestQuery } from "@/hooks/queries/use-get-received-requests-query";
import EmotionImage from "@/ui/common/emotion-image.common";
import { useEffect } from "react";
import { toast } from "react-toastify";

const ReceivedFriendList = () => {
  const { data, error } = useGetReceivedRequestQuery();
  const { mutate: acceptRequest } = useAcceptFriendRequestMutation();

  useEffect(() => {
    if (error) {
      toast.error(TOAST_MESSAGE.MYPAGE.FRIEND_RECEIVED_ERROR);
    }
  }, [error]);

  if (!data || data.length === 0)
    return (
      <div className="flex justify-center items-center text-base text-grey-3 px-4">
        {UI_TEXT.MYPAGE.EMPTY_FRIEND_RECEIVED_ALT}
      </div>
    );

  return (
    <div className="w-full flex flex-col">
      {data.map((request) => (
        <div
          key={request.id}
          className="border-b p-4 w-full flex justify-between items-center"
        >
          <div className="flex justify-start items-center gap-2">
            <EmotionImage src={EMOTION_COOKIE_IMAGE_URL.JOY} size="s" />
            <p className="flex items-center gap-2 font-semibold text-xl text-grey-7">
              {request.users.user_nickname}
            </p>
          </div>
          <button
            onClick={() => acceptRequest(request.id)}
            className="text-sm text-primary-400 border border-primary-300 rounded-full px-2 py-1 hover:bg-primary-300 hover:text-white transition-all duration-300"
          >
            수락하기
          </button>
        </div>
      ))}
    </div>
  );
};

export default ReceivedFriendList;
