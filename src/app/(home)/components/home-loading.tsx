"use client";

import LoadingCookie from "@/ui/common/loading-cookie.common";
import { useEffect, useState } from "react";
import HomeCalendar from "./home-calendar";
import HomeFriend from "./home-friend";
import HomeMusic from "./home-music";
import HomePosting from "./home-posting";
import HomeStack from "./home-stack";

export const HomePageShell = ({ userId }: { userId: string }) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("home-loaded");

    if (hasLoaded) {
      setIsReady(true);
      return;
    }

    const timer = setTimeout(() => {
      sessionStorage.setItem("home-loaded", "true");
      setIsReady(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {!isReady && (
        <div className="flex h-full flex-col items-center justify-center">
          <LoadingCookie />
          <strong className="mt-10 text-xl">로딩중이에요 !</strong>
          <div className="grey-5 mt-2">잠시만 기다려주세요.</div>
        </div>
      )}

      <div className={`${!isReady ? "invisible" : ""}`}>
        <div className="flex flex-col md:max-h-[702px] md:flex-row md:gap-10">
          <div className="mt-[3rem] hidden h-full w-[32%] flex-col md:flex">
            <div className="flex flex-col justify-between gap-3">
              <div className="flex flex-col gap-3">
                <HomeStack userId={userId} />
                <HomeFriend userId={userId} />
              </div>
              <div>
                <HomeMusic userId={userId} />
              </div>
            </div>
          </div>
          <div className="w-full flex-1 md:max-h-[702px] md:w-[68%]">
            <HomePosting userId={userId} />
            <HomeCalendar userId={userId} />
            <div className="mt-5 flex flex-col gap-5 md:hidden">
              <HomeFriend userId={userId} />
              <HomeMusic userId={userId} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
