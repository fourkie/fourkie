"use client";

import { TOAST_MESSAGE } from "@/constants/toast-message.constant";
import { useAcceptFriendRequestMutation } from "@/hooks/mutations/use-accept-friend-request-mutation";
import { useGetReceivedRequestQuery } from "@/hooks/queries/use-get-received-requests-query";
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
    return <div className="border">받은 친구 요청이 없습니다.</div>;

  return (
    <div className="border">
      {data.map((request) => (
        <div key={request.id} className="border">
          <span>{request.users.user_nickname}</span>
          <button onClick={() => acceptRequest(request.id)} className="border">
            수락하기
          </button>
        </div>
      ))}
    </div>
  );
};

export default ReceivedFriendList;
