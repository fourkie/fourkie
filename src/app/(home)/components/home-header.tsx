"use client";

import { useRefreshHeader } from "@/hooks/custom/use-refresh-header";
import { getUserIdClient } from "@/services/home-client-service";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const HomeHeader = () => {
  const pathname = usePathname();
  const route = useRouter();
  const [userId, setUserId] = useState<string | undefined>(undefined);
  //커스텀 훅으로 클라이언트 사이드 라이프사이클에 의존하는 것들을 안전하게 클라이언트 전용으로 사용
  const { nickname, loading, isLoggedIn } = useRefreshHeader(userId);

  useEffect(() => {
    const fetchUser = async () => {
      const userid = await getUserIdClient();
      if (userid) {
        setUserId(userid);
      }
    };
    fetchUser();
  }, []);

  if (loading) return null;
  if (!isLoggedIn) return null;
  if (!nickname || !isLoggedIn) return <div>잘못된 접근</div>;

  if (pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up")) {
    return null;
  }

  const handlePlus = () => {
    route.push("/posting");
  };
  return (
    <div className="flex flex-row items-center justify-between bg-primary-50 p-3">
      <div className="text-2xl mx-auto">{nickname}님</div>
      <div
        className="text-3xl font-bold cursor-pointer text-white hover:text-secondary-200"
        onClick={handlePlus}
      >
        +
      </div>
    </div>
  );
};

export default HomeHeader;
