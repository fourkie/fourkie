"use client";
import {
  CirclePlus,
  HeartHandshake,
  House,
  Music4,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navigation = () => {
  const pathname = usePathname();
  //레이아웃 + 헤더 경로 상수화
  if (
    pathname.startsWith("/sign-in") ||
    pathname.startsWith("/sign-up") ||
    pathname.startsWith("/posting")
  ) {
    return null;
  }

  return (
    <div className="fixed bottom-0 z-40 grid h-[106px] w-full grid-cols-5 items-center justify-evenly rounded-t-[28px] border-t border-grey-1 bg-white pb-[34px] text-black shadow-md">
      <Link href="/">
        {pathname === "/" ? (
          <div className="flex flex-col items-center justify-center text-center text-black">
            <House className="h-5 w-5" />
            <p>홈</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center text-grey-3">
            <House className="h-5 w-5" />
            <p>홈</p>
          </div>
        )}
      </Link>
      <Link href="/list">
        {pathname === "/list" ? (
          <div className="flex flex-col items-center justify-center text-center text-black">
            <HeartHandshake className="h-5 w-5" />
            리스트
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center text-grey-3">
            <HeartHandshake className="h-5 w-5" />
            리스트
          </div>
        )}
      </Link>
      <Link href="/posting">
        <CirclePlus className="mx-auto h-10 w-10 text-primary-400" />
      </Link>

      <Link href="/music">
        {pathname === "/music" ? (
          <div className="flex flex-col items-center justify-center text-center text-black">
            <Music4 className="h-5 w-5" /> 음악
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center text-grey-3">
            <Music4 className="h-5 w-5" /> 음악
          </div>
        )}
      </Link>
      <Link href="/my-page">
        {pathname.startsWith("/my-page") ||
        pathname.startsWith("/notice") ||
        pathname.startsWith("/version") ||
        pathname.startsWith("/term") ||
        pathname.startsWith("/smookie-makers") ||
        pathname.startsWith("/friends") ? (
          <div className="flex flex-col items-center justify-center text-center text-black">
            <UserRound className="h-5 w-5" />
            마이
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center text-grey-3">
            <UserRound className="h-5 w-5" />
            마이
          </div>
        )}
      </Link>
    </div>
  );
};

export default Navigation;
