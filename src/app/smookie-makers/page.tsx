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
  const supabaseClient = createClient();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
        error,
      } = await supabaseClient.auth.getUser();
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
    <div className="flex-col items-center justify-center">
      {/* 상단 소개 영역 */}
      <div className="flex flex-col items-center justify-center space-y-5">
        <strong className="text-center text-2xl text-grey-7">
          Smookie Bakers
        </strong>
        <div className="text-center text-sm text-grey-5">
          우리는 기술에 감성을 더하는 팀 &nbsp;
          <span className="font-semibold text-primary-300">FOURKIE</span>
          입니다.
        </div>
        <div className="text-center text-sm text-grey-5">
          단순한 다이어리가 아닌, <br /> 마음을 돌보는 경험을 디자인하고자
          했습니다.
        </div>
        <div className="text-center text-sm text-grey-5">
          <strong className="text-sm text-primary-300">SMOOKIE</strong>
          는 <br /> 하루의 시작과 끝에서 조용한 응원과 위로가 필요한
        </div>
        <strong className="text-center text-sm text-primary-300">
          바로 당신을 위한 서비스입니다.
        </strong>

        {/* 카드 슬라이드 영역 */}
        <div className="flex w-full min-w-[300px] max-w-[700px] flex-col items-center justify-center pt-2">
          {/* 카드 박스 */}
          <div className="mx-auto flex w-full flex-col items-center gap-4 rounded-3xl border border-primary-100 px-5">
            {/* 슬라이드 영역 */}
            <div className="relative mt-5 h-[360px] w-full overflow-hidden rounded-2xl">
              <div
                className="absolute left-0 top-0 w-full transition-transform duration-500 md:left-10"
                style={{
                  transform: `translateY(-${view * 360}px)`,
                  height: `${360 * memberCards.length}px`,
                }}
              >
                {memberCards.map((card, index) => (
                  <div
                    key={index}
                    className="flex h-[360px] w-full items-center justify-center"
                  >
                    <div className="mx-auto flex w-full flex-col items-center gap-4 md:flex-row md:gap-10">
                      {/* 이미지 */}
                      <Image
                        src={card.image}
                        alt={`${card.name} 이미지`}
                        width={170}
                        height={170}
                        className="mt-3 rounded-full bg-grey-0 md:h-[200px] md:w-[200px]"
                      />
                      {/* 텍스트 */}
                      <div className="space-y-2 text-center text-grey-7 md:text-left">
                        <strong className="text-2xl md:text-3xl">
                          {card.name}
                        </strong>
                        <p className="text-base font-semibold text-grey-6 md:text-lg">
                          {card.address}
                        </p>
                        <a
                          href={card.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="break-all text-sm font-semibold text-blue-400 underline md:text-base"
                        >
                          {card.github}
                        </a>
                        <p className="text-base font-semibold text-grey-6 md:text-lg">
                          {card.line}
                        </p>
                        <p className="text-sm font-semibold text-grey-5 md:text-base">
                          {card.intro}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* 버튼 */}
            <div className="flex justify-center gap-4 pb-5">
              <button onClick={handlePrev}>
                <ChevronUp className="h-6 w-6" />
              </button>
              <button onClick={handleNext}>
                <ChevronDown className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Makers;
