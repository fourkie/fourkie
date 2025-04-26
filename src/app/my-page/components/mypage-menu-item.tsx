"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { MypageMenuItemProps } from "../type";

const MypageMenuItem = ({ href, label, icon }: MypageMenuItemProps) => {
  return (
    <Link
      href={href}
      className="flex items-center justify-between py-4 transition-all duration-300 hover:text-secondary-300"
    >
      <strong className="flex w-full items-center gap-2 text-grey-7 transition-all duration-300 hover:text-secondary-300">
        {icon}
        {label}
      </strong>
      <ChevronRight size={20} />
    </Link>
  );
};

export default MypageMenuItem;
