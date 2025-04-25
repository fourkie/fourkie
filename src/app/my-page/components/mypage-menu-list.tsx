"use client";

import { handleLogout } from "@/services/auth-service";
import { useQueryClient } from "@tanstack/react-query";
import { HeartHandshake, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import MypageMenuItem from "./mypage-menu-item";

const MypageMenuList = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return (
    <ul>
      <li>
        <MypageMenuItem
          href="/friends"
          label="내 친구"
          icon={<HeartHandshake size={20} />}
        />
      </li>
      <li>
        <MypageMenuItem href="/notice" label="공지사항" />
      </li>
      <li>
        <MypageMenuItem href="/terms" label="약관정책" />
      </li>
      <li>
        <MypageMenuItem href="/tutorial?from=my-page" label="스무키 사용법" />
      </li>
      <li>
        <MypageMenuItem href="/smookie-makers" label="스무키 베이커스" />
      </li>
      <li>
        <div className="transition-all duration-300 hover:pl-1">
          <button
            onClick={() =>
              handleLogout(() => {
                router.push("/sign-in");
                queryClient.clear();
              })
            }
            className="flex w-full items-center gap-2 py-3 text-left font-medium text-secondary-300"
          >
            <LogOut size={18} />
            로그아웃
          </button>
        </div>
      </li>
    </ul>
  );
};

export default MypageMenuList;
