"use client";

import { HeartHandshake, LogOut } from "lucide-react";
import MypageMenuItem from "./mypage-menu-item";
import { useRouter } from "next/navigation";
import { handleLogout } from "@/services/auth-service";

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
        <MypageMenuItem href="/version" label="버전정보" />
      </li>
      <li>
        <MypageMenuItem href="/smookie-makers" label="메이커스" />
      </li>
      <li>
        <div className="hover:pl-1 transition-all duration-300">
          <button
            onClick={() => handleLogout(router)}
            className="w-full flex items-center gap-2 text-left px-4 py-3 text-secondary-300 font-medium"
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
