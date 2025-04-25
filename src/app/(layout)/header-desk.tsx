"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const HeaderDesk = () => {
  const pathname = usePathname();

  // 특정 페이지에서는 헤더 제외
  if (pathname.startsWith("/tutorial")) return null;

  // 로그인/회원가입 페이지에서는 축소된 헤더
  if (pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up")) {
    return (
      <div className="fixed top-0 hidden h-[56px] w-full bg-primary-50 lg:flex">
        <div className="mx-auto flex h-full w-full max-w-[1020px] items-center justify-between p-3 text-grey-6">
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
      <div className="header-desk fixed top-0 z-40 hidden h-[56px] w-full bg-primary-50 md:block">
        <div className="mx-auto flex h-full w-full max-w-[1024px] items-center justify-between p-5 text-grey-8">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/joy.png" width={39} height={39} alt="조이" />
            <strong className="text-xl">Smookie</strong>
          </Link>
          <div className="flex gap-4">
            <Link href="/list">
              <strong>기록 목록</strong>
            </Link>
            <Link href="/music">
              <strong>음악 리스트</strong>
            </Link>
            <Link href="/my-page">
              <strong>마이페이지</strong>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderDesk;
