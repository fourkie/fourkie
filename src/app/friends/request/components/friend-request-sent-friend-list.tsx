"use client";

import EMOTION_COOKIE_IMAGE_URL from "@/constants/emotions-url.constant";
import { TOAST_MESSAGE } from "@/constants/toast-message.constant";
import { UI_TEXT } from "@/constants/ui-text";
import { useCancelFriendRequestMutation } from "@/hooks/mutations/use-cancel-friend-request-mutation";
import { useGetSentRequestsQuery } from "@/hooks/queries/use-get-sent-requests-query";
import { getUserForClient } from "@/services/user-client-service";
import EmotionImage from "@/ui/common/emotion-image.common";
import EmptyAlert from "@/ui/common/empty-alert.common";
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
    return <EmptyAlert text={UI_TEXT.MYPAGE.EMPTY_FRIEND_SENT_ALT} />;

  return (
    <div className="flex w-full flex-col">
      {data.map((request) => (
        <div
          key={request.id}
          className="flex w-full items-center justify-between py-4"
        >
          <div className="flex items-center justify-start gap-2">
            <EmotionImage src={EMOTION_COOKIE_IMAGE_URL.EXCITED} size="xs" />
            <p className="flex items-center gap-2 text-lg font-medium text-grey-7">
              {request.users.user_nickname}
            </p>
          </div>
          <button
            aria-label="친구 요청 취소 버튼"
            onClick={() => cancelRequest(request.id)}
            className="rounded-full border border-amber-400 px-2 py-1 text-sm text-amber-500 transition-all duration-300 hover:bg-amber-400 hover:text-white"
          >
            요청취소
          </button>
        </div>
      ))}
    </div>
  );
};

export default SentFriendList;
