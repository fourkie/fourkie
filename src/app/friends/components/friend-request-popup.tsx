"use client";

import { HeartHandshake, X } from "lucide-react";
import { FriendRequestPopUpProps } from "../type";

const FriendrequestPopUp = ({
  user,
  onClose,
  handleSendRequest,
}: FriendRequestPopUpProps) => {
  return (
    <div className="border">
      <div className="border">
        <button onClick={onClose} className="border">
          <X size={20} />
        </button>
        <div className="border">
          {/* 쿠키 들어갈 자리 */}
          <h1>{user.user_nickname}</h1>
        </div>
        <p className="border">
          {user.user_nickname} 님께
          <br />
          친구 요청을 보낼까요?
        </p>
        <button onClick={handleSendRequest} className="border">
          <HeartHandshake size={20} />
          친구 요청
        </button>
      </div>
    </div>
  );
};

export default FriendrequestPopUp;
