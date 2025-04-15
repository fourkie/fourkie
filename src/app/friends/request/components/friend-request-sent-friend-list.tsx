"use client";

import { TOAST_MESSAGE } from "@/constants/toast-message.constant";
import { useGetSentRequestsQuery } from "@/hooks/queries/use-get-sent-requests-query";
import { useEffect } from "react";
import { toast } from "react-toastify";

const SentFriendList = () => {
  const { data, error } = useGetSentRequestsQuery();

  useEffect(() => {
    if (error) {
      toast.error(TOAST_MESSAGE.MYPAGE.FRIEND_SENT_ERROR);
    }
  }, [error]);

  if (!data || data.length === 0)
    return <div className="border">보낸 친구 요청이 없습니다.</div>;

  return (
    <div className="border">
      {data.map((request) => (
        <div key={request.id} className="border">
          <p>{request.users.user_nickname}</p>
        </div>
      ))}
    </div>
  );
};

export default SentFriendList;
