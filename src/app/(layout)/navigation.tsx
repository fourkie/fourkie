"use client";
import { TOAST_MESSAGE } from "@/constants/toast-message.constant";
import { useGetPostTodayEmotionByIdQuery } from "@/hooks/queries/use-get-posts-today-emotion-by-id-query";
import { useTabStore } from "@/hooks/zustand/list-tab-store";
import { usePostStore } from "@/hooks/zustand/post-date-store";
import createClient from "@/services/supabase-client-service";
import {
  CirclePlus,
  HeartHandshake,
  House,
  Music4,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const myPagePaths = [
  "/my-page",
  "/notice",
  "/version",
  "/terms",
  "/smookie-makers",
  "/friends",
];

const commonStyle =
  "transition-all duration-300 flex flex-col items-center justify-center gap-2 text-center hover:text-secondary-300";
const Navigation = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const supabaseClient = createClient();

  const { setSelectedTab } = useTabStore();
  const { setSelectedDate } = usePostStore();

  const isMyPage = myPagePaths.includes(pathname);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabaseClient.auth.getUser();

      if (user?.id) setUserId(user.id);
    };

    getUser();
  }, []);

  const { data: today } = useGetPostTodayEmotionByIdQuery(userId);

  if (
    pathname.startsWith("/sign-in") ||
    pathname.startsWith("/sign-up") ||
    pathname.startsWith("/tutorial") ||
    pathname.startsWith("/posting")
  ) {
    return null;
  }

  return (
    <div className="fixed bottom-0 z-40 grid h-[72px] w-full min-w-[360px] grid-cols-5 items-center justify-evenly rounded-t-[28px] border border-grey-1 bg-white text-xs text-grey-7 md:hidden">
      <Link href="/">
        <div
          className={`${commonStyle} ${pathname === "/" ? "" : "text-grey-3"}`}
        >
          <House className="h-6 w-6" />
          <p>홈</p>
        </div>
      </Link>
      <Link
        href="/list"
        onClick={() => {
          setSelectedTab("firstTab");
          setSelectedDate(null);
        }}
      >
        <div
          className={`${commonStyle} ${pathname === "/list" ? "" : "text-grey-3"}`}
        >
          <HeartHandshake className="h-6 w-6" />
          리스트
        </div>
      </Link>
      <div
        onClick={() => {
          if (today && today.length > 0) {
            toast.warning(TOAST_MESSAGE.POST.TODAY.EXISTS);
            return;
          }
          router.push("/posting");
        }}
        className="cursor-pointer"
      >
        <CirclePlus className="mx-auto h-11 w-11 text-primary-400 hover:text-secondary-300" />
      </div>
      <Link href="/music">
        <div
          className={`${commonStyle} ${pathname === "/music" ? "" : "text-grey-3"}`}
        >
          <Music4 className="h-6 w-6" /> 음악
        </div>
      </Link>
      <Link href="/my-page">
        <div className={`${commonStyle} ${isMyPage ? "" : "text-grey-3"}`}>
          <UserRound className="h-6 w-6" />
          마이
        </div>
      </Link>
    </div>
  );
};

export default Navigation;
