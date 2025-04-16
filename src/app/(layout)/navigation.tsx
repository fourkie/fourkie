"use client";
import Link from "next/link";
import { House, Gem, CirclePlus, Music4, UserRound } from "lucide-react";
import { usePathname } from "next/navigation";

const Navigation = () => {
  const pathname = usePathname();

  if (
    pathname.startsWith("/sign-in") ||
    pathname.startsWith("/sign-up") ||
    pathname.startsWith("/posting")
  ) {
    return null;
  }

  return (
    <div className="grid grid-cols-5 justify-evenly items-center text-black fixed bottom-0 w-full h-[106px] pb-[34px]  rounded-t-[28px] bg-white shadow-md z-10  border-t border-grey-1">
      <Link href="/">
        {pathname === "/" ? (
          <div className="flex flex-col items-center justify-center text-center text-black">
            <House className="w-5 h-5" />
            <p>홈</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center text-grey-3">
            <House className="w-5 h-5" />
            <p>홈</p>
          </div>
        )}
      </Link>
      <Link href="/list">
        {pathname === "/list" ? (
          <div className="flex flex-col items-center justify-center text-center text-black">
            <Gem className="w-5 h-5" />
            리스트
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center text-grey-3">
            <Gem className="w-5 h-5" />
            리스트
          </div>
        )}
      </Link>
      <Link href="/posting">
        <CirclePlus className="w-10 h-10 text-primary-400 mx-auto" />
      </Link>

      <Link href="/music">
        {pathname === "/music" ? (
          <div className="flex flex-col items-center justify-center text-center text-black">
            <Music4 className="w-5 h-5" /> 음악
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center text-grey-3">
            <Music4 className="w-5 h-5" /> 음악
          </div>
        )}
      </Link>
      <Link href="my-page">
        {pathname.startsWith("/my-page") ? (
          <div className="flex flex-col items-center justify-center text-center text-black">
            <UserRound className="w-5 h-5" />
            마이
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center text-grey-3">
            <UserRound className="w-5 h-5" />
            마이
          </div>
        )}
      </Link>
    </div>
  );
};

export default Navigation;
