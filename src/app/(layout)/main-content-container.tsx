"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const MainContentContainer = ({ children }: { children: ReactNode }) => {
  const pathName = usePathname();

  return (
    <main
      className="flex h-screen w-screen justify-center px-5 pb-36 pt-[76px] md:py-24 md:pb-0"
      style={{
        backgroundColor:
          pathName.startsWith("/sign-in") ||
          pathName.startsWith("/sign-up") ||
          pathName.startsWith("/list")
            ? "var(--color-primary-50)"
            : "var(--color-white)",
      }}
    >
      <div className="w-full min-w-[360px] max-w-[1024px]"> {children}</div>
    </main>
  );
};

export default MainContentContainer;
