"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import GithubIcon from "../svg-icon/github.icon";
import GoogleIcon from "../svg-icon/google.icon";
import SpotifyIcon from "../svg-icon/spotify.icon";

const FooterContents = () => {
  const path = usePathname();
  const isSignInPage = path === "/sign-in";
  const isSignUpPage = path === "/sign-up";

  return (
    <>
      {!isSignInPage && !isSignUpPage && (
        <div className="bg-grey-0 text-grey-3 sm:hidden md:flex md:justify-center">
          <div className="flex w-full max-w-5xl flex-col bg-grey-0 p-5">
            {/* 로고 이미지 / 로고 */}
            <div className="flex w-full items-center justify-between">
              <div className="inline-flex items-center justify-center gap-[6px]">
                <strong className="text-[30px] text-grey-4">Smookie</strong>
              </div>

              <strong className="flex items-end justify-center gap-[45px] text-[15px]">
                <Link
                  href={"/notice"}
                  className="transition-all duration-300 hover:text-grey-4"
                >
                  <p>공지사항</p>
                </Link>
                <Link
                  href={"/terms"}
                  className="transition-all duration-300 hover:text-grey-4"
                >
                  <p>약관정책</p>
                </Link>
                <Link
                  href={"/tutorial?from=footer"}
                  className="transition-all duration-300 hover:text-grey-4"
                >
                  <p>튜토리얼</p>
                </Link>
                <Link
                  href={"/smookie-makers"}
                  className="transition-all duration-300 hover:text-grey-4"
                >
                  <p>베이커스</p>
                </Link>
              </strong>
            </div>

            {/* 서비스 소개 문구 */}
            <p className="w-full border-b border-grey-2 pb-10 pt-2">
              감정을 기록하고 그에 맞는 음악을 추천받는 AI 기반 감정 기록 서비스
            </p>

            {/* 아이콘 */}
            <div className="flex w-full items-center justify-between gap-4 pb-4 pt-6 text-[#BEBEBE] opacity-75">
              <div className="flex gap-[6px]">
                <Link
                  href={"mailto:fourkie2504021440@gmail.com"}
                  className="transition-all duration-300 hover:text-grey-4"
                >
                  <GoogleIcon />
                </Link>
                <Link
                  href="https://github.com/fourkie/fourkie.git"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all duration-300 hover:text-grey-4"
                >
                  <GithubIcon />
                </Link>
                <Link
                  href="https://open.spotify.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all duration-300 hover:text-grey-4"
                >
                  <SpotifyIcon />
                </Link>
              </div>
              <p className="text-[15px]">
                ©2025 SMOOKIE. Copyright All Rights Reserved
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FooterContents;
