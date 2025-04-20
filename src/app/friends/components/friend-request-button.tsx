"use client";

import { useGetReceivedRequestQuery } from "@/hooks/queries/use-get-received-requests-query";
import { getUserForClient } from "@/services/user-client-service";
import Link from "next/link";
import { useEffect, useState } from "react";

const FriendRequestButton = () => {
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const fetchUserId = async () => {
      const result = await getUserForClient();
      if (result) setUserId(result.userId);
    };

    fetchUserId();
  }, []);

  const { data: receivedRequests } = useGetReceivedRequestQuery(userId);

  const notification = receivedRequests && receivedRequests.length > 0;

  return (
    <Link
      href="/friends/request"
      className="flex w-full items-center justify-end gap-1 text-sm text-grey-5"
    >
      요청 목록
      {notification && (
        <div className="h-2 w-2 rounded-full bg-secondary-300"></div>
      )}
    </Link>
  );
};

export default FriendRequestButton;
