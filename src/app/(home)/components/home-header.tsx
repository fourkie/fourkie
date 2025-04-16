"use client";

import { useGetUserNicknameByIdQuery } from "@/hooks/queries/use-get-user-nickname-by-id-query";
import { getUserIdClient } from "@/services/home-client-service";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";

/* //헤더 리펙토링 시도 중...
//계획 backIconPaths에 해당하면 뒤로가기 함수랑 같이 주기기
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
//뒤로가기 필요 목록록
const backIconPaths = [
  "/friends",
  "/smookie-makers",
  "/term",
  "/version",
  "/notice",
  "/posting", // 이젠 X 대신 뒤로가기!
];
//공통 tailwind

 */

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

  //뒤로 가는 로직
  const route = useRouter();
  const handleBack = () => {
    route.back();
  };

  //헤더가 필요없는 경우
  if (
    pathname.startsWith("/sign-in") ||
    pathname.startsWith("/sign-up") ||
    pathname.startsWith("/music")
  ) {
    return null;
  }

  //마이페이지 친구
  if (pathname.startsWith("/friends")) {
    return (
      <div className="flex flex-row items-center justify-between bg-primary-50 p-3">
        <ChevronLeft className="cursor-pointer" onClick={handleBack} />
        <div className="text-lg font-bold mx-auto">내 친구</div>
      </div>
    );
  }

  //스무키 메이커
  if (pathname.startsWith("/smookie-makers")) {
    return (
      <div className="flex flex-row items-center justify-between bg-primary-50 p-3">
        <ChevronLeft className="cursor-pointer" onClick={handleBack} />
        <div className="text-lg font-bold mx-auto">메이커스</div>
      </div>
    );
  }

  //마이페이지 친구
  if (pathname.startsWith("/term")) {
    return (
      <div className="flex flex-row items-center justify-between bg-primary-50 p-3">
        <ChevronLeft className="cursor-pointer" onClick={handleBack} />
        <div className=" text-lg font-bold mx-auto">약관정책</div>
      </div>
    );
  }

  //버전
  if (pathname.startsWith("/version")) {
    return (
      <div className="flex flex-row items-center justify-between bg-primary-50 p-3">
        <ChevronLeft className="cursor-pointer" onClick={handleBack} />
        <div className=" text-lg font-bold mx-auto">버전정보</div>
      </div>
    );
  }

  //공지
  if (pathname.startsWith("/notice")) {
    return (
      <div className="flex flex-row items-center justify-between bg-primary-50 p-3">
        <ChevronLeft className="cursor-pointer" onClick={handleBack} />
        <div className="text-lg font-bold mx-auto">공지사항</div>
      </div>
    );
  }

  //이후는 닉네임 필요한 로직
  if (!nickname || isLoading || isError)
    return (
      <div className="flex flex-row items-center justify-between bg-primary-50 p-3 h-[56px]"></div>
    );

  //리스트
  if (pathname.startsWith("/list")) {
    return (
      <div className="flex flex-row items-center justify-between bg-primary-50 p-3">
        <div className="text-lg font-bold mx-auto">
          {nickname.user_nickname}님의 기록 목록
        </div>
      </div>
    );
  }

  if (pathname.startsWith("/posting")) {
    return (
      <div className="flex flex-row items-center justify-between bg-primary-50 p-3">
        <ChevronLeft onClick={handleBack} />
        <div className="text-lg font-bold mx-auto">
          {nickname.user_nickname}님의 기록(여기)
        </div>
      </div>
    );
  }

  if (pathname.startsWith("/my-page")) {
    return (
      <div className="flex flex-row items-center justify-between bg-primary-50 p-3">
        <div className="text-lg font-bold mx-auto">
          {nickname.user_nickname}님의 마이페이지
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-row items-center justify-between bg-primary-50 p-3">
      <div className="text-lg font-bold mx-auto">
        {nickname.user_nickname}님
      </div>
    </div>
  );
};

export default HomeHeader;
