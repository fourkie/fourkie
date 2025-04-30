"use client";

import { handleLogout } from "@/services/auth-service";
import { useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { HeartHandshake, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import MypageMenuItem from "./mypage-menu-item";

const MypageMenuList = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const menuItems = [
    {
      href: "/friends",
      label: "내 친구",
      icon: <HeartHandshake size={20} />,
    },
    { href: "/notice", label: "공지사항" },
    { href: "/terms", label: "약관정책" },
    { href: "/tutorial?from=my-page", label: "튜토리얼" },
    { href: "/smookie-makers", label: "스무키 베이커스" },
  ];

  return (
    <ul>
      {menuItems.map((item, index) => (
        <li key={item.href}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { delay: index * 0.1 + 0.2 },
            }}
            viewport={{ once: true }}
          >
            <MypageMenuItem {...item} />
          </motion.div>
        </li>
      ))}

      <li>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { delay: 0.7 },
          }}
          viewport={{ once: true }}
        >
          <div className="transition-all duration-300 hover:pl-1">
            <button
              aria-label="로그아웃"
              onClick={() =>
                handleLogout(() => {
                  router.push("/sign-in");
                  queryClient.clear();
                })
              }
              className="flex w-full items-center gap-2 px-5 py-3 text-left font-semibold text-secondary-300"
            >
              <LogOut size={18} />
              로그아웃
            </button>
          </div>
        </motion.div>
      </li>
    </ul>
  );
};

export default MypageMenuList;
