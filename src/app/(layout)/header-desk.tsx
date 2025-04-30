"use client";

import { useTabStore } from "@/hooks/zustand/list-tab-store";
import { usePostStore } from "@/hooks/zustand/post-date-store";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const myPagePaths = [
  "/my-page",
  "/notice",
  "/version",
  "/terms",
  "/smookie-makers",
  "/friends",
];

const styleHover =
  "inline-block transform transition-transform duration-300 ease-in-out hover:scale-105 hover:text-grey-5";

const HeaderDesk = () => {
  const pathname = usePathname();

  const { setSelectedTab } = useTabStore();
  const { setSelectedDate } = usePostStore();
  const isMyPage = myPagePaths.includes(pathname);

  if (pathname === "/tutorial") return null;

  // 로그인/회원가입 페이지
  if (pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up")) {
    return (
      <div className="fixed top-0 hidden h-[56px] w-full bg-primary-50 md:flex">
        <div className="mx-auto flex h-full w-full max-w-[1024px] items-center justify-between px-5 py-5 text-grey-6">
          <div className="flex items-center gap-2">
            <Image src="/images/Fluffy.png" width={39} height={39} alt="신나" />
            <strong className="text-xl">Smookie</strong>
          </div>
        </div>
      </div>
    );
  }

  // 기본 헤더
  return (
    <>
      <div className="header-desk fixed top-0 z-40 hidden h-[70px] w-full bg-primary-50 md:block">
        <div className="mx-auto flex h-full w-full max-w-[1024px] items-center justify-between px-5 py-5 text-grey-8">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/Fluffy.png" width={39} height={39} alt="신나" />
            <strong className="text-xl">Smookie</strong>
          </Link>
          <div className="flex gap-8">
            <Link
              href="/list"
              onClick={() => {
                setSelectedTab("firstTab");
                setSelectedDate(dayjs().format("YYYY-MM-DD"));
              }}
            >
              <strong
                className={`${styleHover} ${
                  pathname === "/list" ? "text-primary-700" : "text-grey-4"
                }`}
              >
                기록 목록
              </strong>
            </Link>
            <Link href="/music">
              <strong
                className={`${styleHover} ${
                  pathname === "/music" ? "text-primary-700" : "text-grey-4"
                }`}
              >
                음악 리스트
              </strong>
            </Link>
            <Link href="/my-page">
              <strong
                className={`${styleHover} ${isMyPage ? "text-primary-700" : "text-grey-4"}`}
              >
                마이 페이지
              </strong>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderDesk;
