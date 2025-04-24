"use client";

import { useGetUserNicknameQuery } from "@/hooks/queries/use-get-user-nickname-query";
import { getUserForClient } from "@/services/user-client-service";
import MypageEmotionGraph from "@/ui/common/mypage-emotion-graph";
import { useEffect, useState } from "react";

const MypageGraph = () => {
  const [userId, setUserId] = useState<string>("");
  const { data: nickname } = useGetUserNicknameQuery();

  useEffect(() => {
    const fetchUserId = async () => {
      const result = await getUserForClient();
      if (result?.userId) setUserId(result.userId);
    };
    fetchUserId();
  }, []);

  if (!userId || !nickname) return null;

  return (
    <div className="w-full rounded-xl bg-white p-6 md:w-3/5 md:max-w-[600px]">
      <MypageEmotionGraph userId={userId} />
    </div>
  );
};

export default MypageGraph;
