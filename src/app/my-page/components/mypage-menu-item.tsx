"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { MypageMenuItemProps } from "../type";

const MypageMenuItem = ({ href, label, icon }: MypageMenuItemProps) => {
  return (
    <Link
      aria-label={`마이페이지 ${label}로 이동`}
      href={href}
      className="flex items-center justify-between px-5 py-4 pr-1 hover:pr-0  transition-all duration-300 hover:text-secondary-300"
    >
      <strong className="flex flex-1 items-center gap-2 text-grey-7 transition-all duration-300 hover:text-secondary-300">
        {icon}
        {label}
      </strong>
      <ChevronRight size={20} className="md:h-7 md:w-7" />
    </Link>
  );
};

export default MypageMenuItem;
