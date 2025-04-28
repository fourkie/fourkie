"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const MainContentContainer = ({ children }: { children: ReactNode }) => {
  const pathName = usePathname();

  return (
    <main
      className={`min-w-screen flex min-h-screen justify-center ${
        pathName.startsWith("/music")
          ? ""
          : "md:py-19 px-5 pb-36 pt-[76px] md:pb-12"
      } ${
        pathName.startsWith("/sign-in") ||
        pathName.startsWith("/sign-up") ||
        pathName.startsWith("/list")
          ? "bg-primary-50"
          : "bg-white"
      }`}
    >
      <div className="w-full min-w-[320px] max-w-[984px]"> {children}</div>
    </main>
  );
};

export default MainContentContainer;
