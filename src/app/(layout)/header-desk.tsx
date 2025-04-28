"use client";

import { useTabStore } from "@/hooks/zustand/list-tab-store";
import { usePostStore } from "@/hooks/zustand/post-date-store";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const HeaderDesk = () => {
  const pathname = usePathname();

  //리스트
  const { setSelectedTab } = useTabStore();
  const { setSelectedDate } = usePostStore();

  // 헤더 제외
  if (pathname === "/tutorial") return null;

  // 로그인/회원가입 페이지
  if (pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up")) {
    return (
      <div className="fixed top-0 hidden h-[56px] w-full bg-primary-50 px-5 md:flex">
        <div className="mx-auto flex h-full w-full max-w-[1024px] items-center justify-between py-5 text-grey-6">
          <div className="flex items-center gap-2">
            <Image src="/images/joy.png" width={39} height={39} alt="조이" />
            <strong className="text-xl">Smookie</strong>
          </div>
        </div>
      </div>
    );
  }

  // 기본 헤더
  return (
    <>
      <div className="header-desk fixed top-0 z-40 hidden h-[56px] w-full bg-primary-50 px-5 md:block">
        <div className="mx-auto flex h-full w-full max-w-[1024px] items-center justify-between py-5 text-grey-8">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/joy.png" width={39} height={39} alt="조이" />
            <strong className="text-xl">Smookie</strong>
          </Link>
          <div className="flex gap-4">
            <Link
              href="/list"
              onClick={() => {
                setSelectedTab("firstTab");
                setSelectedDate(null);
              }}
            >
              {pathname === "/list" ? (
                <strong className="text-primary-700">기록 목록</strong>
              ) : (
                <strong className="text-grey-4">기록 목록</strong>
              )}
            </Link>
            <Link href="/music">
              {pathname === "/music" ? (
                <strong className="text-primary-700">음악 리스트</strong>
              ) : (
                <strong className="text-grey-4">음악 리스트</strong>
              )}
            </Link>
            <Link href="/my-page">
              {pathname.startsWith("/my-page") ||
              pathname.startsWith("/notice") ||
              pathname.startsWith("/version") ||
              pathname.startsWith("/term") ||
              pathname.startsWith("/smookie-makers") ||
              pathname.startsWith("/friends") ? (
                <strong className="text-primary-700">마이 페이지</strong>
              ) : (
                <strong className="text-grey-4">마이 페이지</strong>
              )}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderDesk;
