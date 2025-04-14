"use client";

import { useRouter } from "next/navigation";

const FriendRequestButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/friends/request")}
      className="w-full flex justify-end items-center text-xs text-grey-5 gap-1"
    >
      받은 친구 요청
    </button>
  );
};

export default FriendRequestButton;
