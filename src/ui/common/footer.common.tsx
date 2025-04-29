import Image from "next/image";
import Link from "next/link";
import GithubIcon from "../svg-icon/github.icon";
import GoogleIcon from "../svg-icon/google.icon";
import SpotifyIcon from "../svg-icon/spotify.icon";

const Footer = () => {
  return (
    <div className="bg-red-900 sm:hidden md:flex md:justify-center">
      <div className="inline-flex w-full max-w-5xl flex-row items-center justify-between px-5 py-10">
        <div className="flex gap-2 bg-red-500">
          <Image
            src="/images/Fluffy.png"
            alt="Fluffy"
            width={38}
            height={38}
            priority
            quality={100}
            className="h-[38px] w-[38px]"
          />
          <strong className="text-[28px]">Smookie</strong>
        </div>

        <div className="space-y-4 bg-yellow-400">
          <p>버전 정보</p>
          <p>약관 정책</p>
          <p>개인정보 보호</p>
          <p>공지사항</p>
        </div>

        <div className="flex flex-col gap-4 bg-green-500">
          <Link href={"mailto:fourkie2504021440@gmail.com"}>
            <GoogleIcon />
          </Link>
          <Link
            href="https://github.com/fourkie/fourkie.git"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon />
          </Link>
          <Link
            href="https://open.spotify.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SpotifyIcon />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
