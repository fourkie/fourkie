"use client";

import EMOTION_COOKIE_IMAGE_URL from "@/constants/emotions-url.constant";
import { TOAST_MESSAGE } from "@/constants/toast-message.constant";
import { UI_TEXT } from "@/constants/ui-text";
import { useGetSentRequestsQuery } from "@/hooks/queries/use-get-sent-requests-query";
import { getUserForClient } from "@/services/user-client-service";
import EmotionImage from "@/ui/common/emotion-image.common";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const SentFriendList = () => {
  const [userId, setUserId] = useState<string>("");
  useEffect(() => {
    const fetchUserId = async () => {
      const result = await getUserForClient(); // 이 함수가 Promise<{ userId: string }>
      if (result) setUserId(result.userId);
    };

    fetchUserId();
  }, []);
  const { data, error } = useGetSentRequestsQuery(userId);

  useEffect(() => {
    if (error) {
      toast.error(TOAST_MESSAGE.MYPAGE.FRIEND_SENT_ERROR);
    }
  }, [error]);

  if (!data || data.length === 0)
    return (
      <div className="flex justify-center items-center text-base text-grey-3 px-4">
        {UI_TEXT.MYPAGE.EMPTY_FRIEND_SENT_ALT}
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
            <EmotionImage src={EMOTION_COOKIE_IMAGE_URL.JOY} size="xs" />
            <p className="flex items-center gap-2 font-medium text-lg text-grey-7">
              {request.users.user_nickname}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SentFriendList;
