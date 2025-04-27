"use client";

import createClient from "@/services/supabase-client-service";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const memberCards = [
  {
    name: "Judy",
    image: "/images/face-jh.png",
    address: "GitHub",
    github: "https://github.com/ijooha16",
    line: "INTRODUCTION",
    intro: "제가 이 조의 팀장입니다.",
  },
  {
    name: "Doni",
    image: "/images/face-dh.png",
    address: "GitHub",
    github: "https://github.com/woodie2933",
    line: "INTRODUCTION",
    intro: "제가 이 조의 부리또입니다.",
  },
  {
    name: "SunTea",
    image: "/images/face-sy.png",
    address: "GitHub",
    github: "https://github.com/usuny0317",
    line: "INTRODUCTION",
    intro: "제가 이 조의 와기톡기입니다.",
  },
  {
    name: "JJANGSIK",
    image: "/images/face-hs.png",
    address: "GitHub",
    github: "https://github.com/sharet9446",
    line: "INTRODUCTION",
    intro: "제가 이 조의 짱식입니다.",
  },
  {
    name: "WooYoung",
    image: "/images/face-wy.png",
    address: "GitHub",
    github: "https://github.com/Koi-0",
    line: "INTRODUCTION",
    intro: "제가 이 조의 막내일걸요?",
  },
];

const Makers = () => {
  const router = useRouter();
  const supabaseServer = createClient();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
        error,
      } = await supabaseServer.auth.getUser();
      if (error || !user) {
        router.replace("/sign-in");
      }
    };

    checkUser();
  }, []);

  const [view, setView] = useState(0);

  const handlePrev = () => {
    setView((prev) => (prev === 0 ? memberCards.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setView((prev) => (prev === memberCards.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 pb-28 pt-20">
      {/* 상단 소개 영역 */}
      <div className="space-y-4">
        <div className="text-center text-xl font-semibold text-grey-7">
          Smookie Bakers
        </div>
        <div className="text-center text-sm text-grey-5">
          우리는 기술에 감성을 더하는 팀{" "}
          <span className="font-semibold text-primary-300">FOURKIE</span>
          입니다.
        </div>
        <div className="text-center text-sm text-grey-5">
          단순한 다이어리가 아닌, <br /> 마음을 돌보는 경험을 디자인하고자
          했습니다.
        </div>
        <div className="text-center text-sm text-grey-5">
          <span className="text-sm font-semibold text-primary-300">
            SMOOKIE
          </span>
          는 <br /> 하루의 시작과 끝에서 조용한 응원과 위로가 필요한 <br />
          <span className="text-center font-bold text-primary-300">
            바로 당신을 위한 서비스입니다.
          </span>
        </div>

        {/* 카드 슬라이드 영역 */}
        <div className="flex w-full flex-col items-center justify-center rounded-3xl border border-primary-100">
          <div className="relative flex h-96 w-5/6 flex-col overflow-hidden">
            {/* 슬라이드 전체 */}
            <div
              className="absolute left-0 top-0 h-full w-full transition-transform duration-500"
              style={{ transform: `translateY(-${view * 100}%)` }}
            >
              {memberCards.map((card, index) => (
                <div
                  key={index}
                  className="flex h-full w-full flex-col items-center justify-center"
                >
                  <div className="flex h-full w-full flex-col items-center justify-center gap-5 rounded-3xl p-6 lg:flex-row">
                    {/* 이미지 영역 */}
                    <div className="flex-shrink-0">
                      <Image
                        src={card.image}
                        alt={`${card.name} 이미지`}
                        width={160}
                        height={160}
                        className="rounded-full bg-primary-50"
                      />
                    </div>

                    {/* 텍스트 영역 */}
                    <div className="flex w-full flex-col items-center justify-center text-center lg:mt-0 lg:items-start lg:text-left">
                      <strong className="mb-2 text-2xl text-grey-7">
                        {card.name}
                      </strong>
                      <h3 className="font-semibold text-grey-3">
                        {card.address}
                      </h3>
                      <a
                        href={card.github}
                        className="mb-2 break-words font-semibold text-blue-400 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {card.github}
                      </a>
                      <h3 className="font-semibold text-grey-3">{card.line}</h3>
                      <p className="text-sm font-medium text-grey-5">
                        {card.intro}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex transform justify-center gap-4 pb-4">
            <button onClick={handlePrev}>
              <ChevronUp className="text-4xl transition-all duration-300 hover:text-secondary-300" />
            </button>
            <button onClick={handleNext}>
              <ChevronDown className="text-4xl transition-all duration-300 hover:text-secondary-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Makers;
