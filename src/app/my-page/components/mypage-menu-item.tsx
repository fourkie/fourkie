"use client";

import Link from "next/link";
import { MypageMenuItemProps } from "../type";
import { ChevronRight } from "lucide-react";

const MypageMenuItem = ({ href, label, icon }: MypageMenuItemProps) => {
  return (
    <Link
      href={href}
      className="flex items-center justify-between bg-white p-4 rounded-xl"
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
