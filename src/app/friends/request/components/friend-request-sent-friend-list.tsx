"use client";

import EMOTION_COOKIE_IMAGE_URL from "@/constants/emotions-url.constant";
import { TOAST_MESSAGE } from "@/constants/toast-message.constant";
import { UI_TEXT } from "@/constants/ui-text";
import { useCancelFriendRequestMutation } from "@/hooks/mutations/use-cancel-friend-request-mutation";
import { useGetSentRequestsQuery } from "@/hooks/queries/use-get-sent-requests-query";
import { getUserForClient } from "@/services/user-client-service";
import EmotionImage from "@/ui/common/emotion-image.common";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const SentFriendList = () => {
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const fetchUserId = async () => {
      const result = await getUserForClient();
      if (result) setUserId(result.userId);
    };

    fetchUserId();
  }, []);

  const { data, error } = useGetSentRequestsQuery(userId);
  const { mutate: cancelRequest } = useCancelFriendRequestMutation();

  useEffect(() => {
    if (error) {
      toast.error(TOAST_MESSAGE.MYPAGE.FRIEND_SENT_ERROR);
    }
  }, [error]);

  if (!data || data.length === 0)
    return (
      <div className="flex items-center justify-center px-4 text-base text-grey-3">
        {UI_TEXT.MYPAGE.EMPTY_FRIEND_SENT_ALT}
      </div>
    );

  return (
    <div className="flex w-full flex-col">
      {data.map((request) => (
        <div
          key={request.id}
          className="flex w-full items-center justify-between border-b p-4"
        >
          <div className="flex items-center justify-start gap-2">
            <EmotionImage src={EMOTION_COOKIE_IMAGE_URL.JOY} size="xs" />
            <p className="flex items-center gap-2 text-lg font-medium text-grey-7">
              {request.users.user_nickname}
            </p>
          </div>
          <button
            onClick={() => cancelRequest(request.id)}
            className="rounded-full border border-secondary-300 px-2 py-1 text-sm text-secondary-300 transition-all duration-300 hover:bg-secondary-300 hover:text-white"
          >
            요청취소
          </button>
        </div>
      ))}
    </div>
  );
};

export default SentFriendList;
