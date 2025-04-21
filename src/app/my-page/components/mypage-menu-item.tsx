"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { MypageMenuItemProps } from "../type";

const MypageMenuItem = ({ href, label, icon }: MypageMenuItemProps) => {
  return (
    <Link
      href={href}
      className="flex items-center justify-between rounded-xl bg-white p-4 transition-all duration-300 hover:text-secondary-300"
    >
      <div className="flex items-center gap-2 font-semibold">
        {icon}
        {label}
      </div>
      <ChevronRight size={20} />
    </Link>
  );
};

export default MypageMenuItem;
