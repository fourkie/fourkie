"use client";

import { handleLogout } from "@/services/auth-service";
import { HeartHandshake, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import MypageMenuItem from "./mypage-menu-item";

const MypageMenuList = () => {
  const router = useRouter();

  return (
    <ul>
      <li>
        <MypageMenuItem
          href="/friends"
          label="내 친구"
          icon={<HeartHandshake size={18} />}
        />
      </li>
      <li>
        <MypageMenuItem href="/notice" label="공지사항" />
      </li>
      <li>
        <MypageMenuItem href="/terms" label="약관정책" />
      </li>
      <li>
        <MypageMenuItem href="/smookie-makers" label="베이커스" />
      </li>
      <li>
        <div className="transition-all duration-300 hover:pl-1">
          <button
            onClick={() =>
              handleLogout(() => {
                router.push("/sign-in");
              })
            }
            className="flex w-full items-center gap-2 px-4 py-3 text-left font-medium text-secondary-300"
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
