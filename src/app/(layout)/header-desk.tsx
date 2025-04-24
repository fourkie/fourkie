"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const HeaderDesk = () => {
  const pathname = usePathname();
  if (pathname.startsWith("/tutorial")) {
    return null;
  }
  if (pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up")) {
    return (
      <div className="fixed left-1/2 top-0 z-50 hidden h-[56px] w-[393px] -translate-x-1/2 items-center bg-primary-50 p-3 text-grey-6 lg:flex lg:w-full lg:max-w-[1020px] lg:justify-between">
        <div className="flex flex-row items-center gap-2">
          <Image src="/images/joy.png" width={39} height={39} alt="조이" />
          <strong className="text-xl">Smookie</strong>
        </div>
      </div>
    );
  }
  return (
    <div className="fixed left-1/2 top-0 z-50 hidden h-[56px] w-[393px] -translate-x-1/2 items-center bg-primary-50 p-3 text-grey-6 lg:flex lg:w-full lg:max-w-[1020px] lg:justify-between">
      <div className="flex flex-row items-center gap-2">
        <Image src="/images/joy.png" width={39} height={39} alt="조이" />
        <strong className="text-xl">Smookie</strong>
      </div>
      <div className="flex gap-4">
        <Link href="/">
          <strong>캘린더</strong>
        </Link>
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
  );
};

export default HeaderDesk;
