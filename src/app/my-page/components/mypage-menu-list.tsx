"use client";

import { HeartHandshake } from "lucide-react";
import MypageMenuItem from "./mypage-menu-item";

const MypageMenuList = () => {
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
    </ul>
  );
};

export default MypageMenuList;
