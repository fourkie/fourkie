"use client";

import { useGetUserNicknameByIdQuery } from "@/hooks/queries/use-get-user-nickname-by-id-query";
import { getUserIdClient } from "@/services/home-client-service";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const HomeHeader = () => {
  const pathname = usePathname();
  const [userId, setUserId] = useState<string | undefined>(undefined);

  //주스탄드로 리렌더링 될 때 userId 값 가져오게
  useEffect(() => {
    const fetchUser = async () => {
      const userid = await getUserIdClient();
      if (userid) {
        setUserId(userid);
      }
    };
    fetchUser();
  }, []);
  const {
    data: nickname,
    isLoading,
    isError,
  } = useGetUserNicknameByIdQuery(userId, {
    enabled: Boolean(userId),
    // 언디파인드일 경우 막기
  });

  if (pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up")) {
    return null;
  }

  if (!nickname || isLoading || isError) return null;

  return (
    <div className="flex flex-row items-center justify-between bg-primary-50 p-3">
      <div className="text-2xl mx-auto">{nickname.user_nickname}님</div>
      <Link href={"/posting"}>
        <div className="text-3xl font-bold cursor-pointer text-white hover:text-secondary-200">
          +
        </div>
      </Link>
    </div>
  );
};

export default HomeHeader;
