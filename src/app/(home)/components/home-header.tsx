"use client";

import { useGetUserNicknameByIdQuery } from "@/hooks/queries/use-get-user-nickname-by-id-query";
import { getUserIdClient } from "@/services/home-client-service";
import { ChevronLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const headerPaths = [
  { path: "/my-page", title: "마이페이지", needsNickname: true },
  { path: "/friends", title: "내 친구", needsNickname: false },
  { path: "/smookie-makers", title: "메이커스", needsNickname: false },
  { path: "/term", title: "약관정책", needsNickname: false },
  { path: "/version", title: "버전정보", needsNickname: false },
  { path: "/notice", title: "공지사항", needsNickname: false },
  { path: "/list", title: "기록 목록", needsNickname: true },
  { path: "/posting", title: "기록", needsNickname: true },
];

//뒤로가기 필요 목록
const backIconPaths = [
  "/friends",
  "/smookie-makers",
  "/term",
  "/version",
  "/notice",
  "/posting",
];

const baseHeaderClass =
  "fixed top-0 z-50  w-full flex flex-row items-center justify-between bg-primary-50 p-3 h-[56px]";

const HomeHeader = () => {
  const pathname = usePathname();
  const [userId, setUserId] = useState<string | undefined>(undefined);

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
  });

  //뒤로 가는 로직
  const route = useRouter();
  const handleBack = () => route.back();

  //헤더가 필요없는 경우
  if (
    pathname.startsWith("/sign-in") ||
    pathname.startsWith("/sign-up") ||
    pathname.startsWith("/tutorial") ||
    pathname.startsWith("/music")
  ) {
    return null;
  }

  // 현재 경로에 맞는 라우트 찾기
  const nowPath = headerPaths.find((headerpath) =>
    pathname.startsWith(headerpath.path),
  );

  //이후는 닉네임 필요한 로직
  if (nowPath?.needsNickname && (!nickname || isLoading || isError)) {
    return <div className={baseHeaderClass}></div>;
  }
  if (!nickname || isLoading || isError)
    return (
      <div className="flex h-[56px] flex-row items-center justify-between bg-primary-50 p-3"></div>
    );

  if (pathname === "/") {
    return (
      <div className={baseHeaderClass}>
        <div className="mx-auto text-lg font-bold">
          {nickname?.user_nickname}
        </div>
      </div>
    );
  }

  const headertext = nowPath
    ? nowPath.needsNickname
      ? `${nickname.user_nickname}님의 ${nowPath.title}`
      : nowPath.title
    : nickname && !isLoading && !isError
      ? `${nickname.user_nickname}님`
      : "";

  const showBackIcon =
    nowPath && backIconPaths.some((p) => pathname.startsWith(p));

  return (
    <div className={baseHeaderClass}>
      {showBackIcon && (
        <ChevronLeft className="cursor-pointer" onClick={handleBack} />
      )}
      <div className="mx-auto text-lg font-bold">{headertext}</div>
    </div>
  );
};

export default HomeHeader;
