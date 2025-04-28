"use client";

import EMOTION_COOKIE_IMAGE_URL from "@/constants/emotions-url.constant";
import { TOAST_MESSAGE } from "@/constants/toast-message.constant";
import { UI_TEXT } from "@/constants/ui-text";
import { useAcceptFriendRequestMutation } from "@/hooks/mutations/use-accept-friend-request-mutation";
import { useGetReceivedRequestQuery } from "@/hooks/queries/use-get-received-requests-query";
import { getUserForClient } from "@/services/user-client-service";
import EmotionImage from "@/ui/common/emotion-image.common";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ReceivedFriendList = () => {
  const [userId, setUserId] = useState<string>("");
  useEffect(() => {
    const fetchUserId = async () => {
      const result = await getUserForClient(); // 이 함수가 Promise<{ userId: string }>
      if (result) setUserId(result.userId);
    };

    fetchUserId();
  }, []);
  const { data, error } = useGetReceivedRequestQuery(userId);
  const { mutate: acceptRequest } = useAcceptFriendRequestMutation();

  useEffect(() => {
    if (error) {
      toast.error(TOAST_MESSAGE.MYPAGE.FRIEND_RECEIVED_ERROR);
    }
  }, [error]);

  if (!data || data.length === 0)
    return (
      <div className="flex items-center justify-center px-4 text-base text-grey-3">
        {UI_TEXT.MYPAGE.EMPTY_FRIEND_RECEIVED_ALT}
      </div>
    );

  return (
    <div className="flex w-full flex-col">
      {data.map((request) => (
        <div
          key={request.id}
          className="flex w-full items-center justify-between p-4"
        >
          <div className="flex items-center justify-start gap-2">
            <EmotionImage src={EMOTION_COOKIE_IMAGE_URL.JOY} size="xs" />
            <p className="flex items-center gap-2 text-lg font-medium text-grey-7">
              {request.users.user_nickname}
            </p>
          </div>
          <button
            onClick={() => acceptRequest(request.id)}
            className="rounded-full border border-primary-300 px-2 py-1 text-sm text-primary-400 transition-all duration-300 hover:bg-primary-300 hover:text-white"
          >
            수락하기
          </button>
        </div>
      ))}
    </div>
  );
};

export default ReceivedFriendList;
