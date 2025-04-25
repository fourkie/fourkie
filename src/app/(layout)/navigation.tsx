"use client";
import { TOAST_MESSAGE } from "@/constants/toast-message.constant";
import { useGetPostTodayEmotionByIdQuery } from "@/hooks/queries/use-get-posts-today-emotion-by-id-query";
import { useTabStore } from "@/hooks/zustand/list-tab-store";
import { usePostStore } from "@/hooks/zustand/post-date-store";
import { usePostingStore } from "@/hooks/zustand/posting-store";
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

const Navigation = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [userId, setUserId] = useState("");
  //레이아웃 + 헤더 경로 상수화
  const supabaseClient = createClient();
  const { setSelectedTab } = useTabStore();
  const { setSelectedDate } = usePostStore();
  const setInputTitle = usePostingStore((state) => state.setInputTitle);
  const setInputContent = usePostingStore((state) => state.setInputContent);

  //오늘 날짜로 포스팅이 이미 있을 경우, /posting으로 진입하지 못함
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
    <div className="fixed bottom-0 z-40 grid h-[90px] w-full min-w-[360px] grid-cols-5 items-center justify-evenly rounded-t-[28px] border border-grey-1 bg-white text-black md:hidden">
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
      <Link
        href="/list"
        onClick={() => {
          setSelectedTab("firstTab");
          setSelectedDate(null);
        }}
      >
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
      <div
        onClick={() => {
          if (today && today.length > 0) {
            toast.warning(TOAST_MESSAGE.POST.TODAY.EXISTS);
            return;
          }
          router.push("/posting");
          setInputTitle("");
          setInputContent("");
        }}
        className="cursor-pointer"
      >
        <CirclePlus className="mx-auto h-11 w-10 text-primary-400" />
      </div>
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
