"use client";

import Link from "next/link";

const FriendRequestButton = () => {
  return (
    <Link
      href="/friends/request"
      className="w-full flex justify-end items-center text-sm text-grey-5 gap-1"
    >
      받은 친구 요청
    </Link>
  );
};

export default FriendRequestButton;
