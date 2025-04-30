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
    intro:
      "너~무 재밌는 팀플이었어요 ! 좋은 경험 하게 해주셔서 감사하고 모두 수고 많으셨습니다, 포키 최고~🫶 우리의 연락은 setInterval()로 계속됩니다ㅋㅋ",
  },
  {
    name: "Doni",
    image: "/images/face-dh.png",
    address: "GitHub",
    github: "https://github.com/woodie2933",
    line: "INTRODUCTION",
    intro:
      " 팀플은 끝났지만, 내 마음은 아직도 여러분한테 그대로 useState로 남아있어요. React9기 4조는... 언제나 내 render에 있겠지, 그치? 💛",
  },
  {
    name: "SunTea",
    image: "/images/face-sy.png",
    address: "GitHub",
    github: "https://github.com/usuny0317",
    line: "INTRODUCTION",
    intro:
      "버그보다 웃음이 많았던 팀플, 매일이 커밋하고 싶은 하루였어요! 함께한 시간이 진짜 배움이자 선물이었습니다. 제 마음은 이미 여러분한테 useRouter로 리다이렉트된 걸요.",
  },
  {
    name: "JJANGSIK",
    image: "/images/face-hs.png",
    address: "GitHub",
    github: "https://github.com/sharet9446",
    line: "INTRODUCTION",
    intro:
      "좋은 사람 만나 좋은 인연 맺은 것도 큰 수확🍀 이젠 각자 꿈의 종착지로 향하는 직행열차 탑승하셨길 바랍니다.",
  },
  {
    name: "WooYoung",
    image: "/images/face-wy.png",
    address: "GitHub",
    github: "https://github.com/Koi-0",
    line: "INTRODUCTION",
    intro:
      "스무키 프로젝트, 혼자였으면 스무스하게 망할 뻔했죠. 여러분 덕분에 스무~스하게, 완성도는 뿜뿜하게 마무리할 수 있었습니다! 우리의 협업은 끝났지만… Git처럼, 언젠가 다시 Merge되기를 바라며 😉",
  },
  {
    name: "HeeWon",
    image: "/images/face-hw.png",
    address: "포키 바구니",
    github: "https://github.com/fourkie/fourkie",
    line: "INTRODUCTION",
    intro:
      "개발에 대한 지식이 많지 않아 소통에 있어 조심스러운 부분도 있었지만, 이 시간을 통해 소통하는 방법을 배우고, 디자인 측면에서도 많은 성장을 할 수 있어 행복하고 감사한 시간이었습니다.",
  },
  {
    name: "Jake",
    image: "/images/face-jk.png",
    address: "GitHub",
    github: "https://github.com/sharet9446",
    line: "INTRODUCTION",
    intro: "스무키~! 즈에요~",
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

        <div className="flex w-full min-w-[300px] max-w-[700px] flex-col items-center justify-center pt-2">
          <div className="mx-auto flex w-full flex-col items-center gap-4 rounded-3xl border border-primary-100 px-5">
            <div className="relative mt-5 h-[360px] w-full overflow-hidden rounded-2xl">
              <div
                className="absolute left-0 top-0 w-full transition-transform duration-500 md:left-5 md:px-8"
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
                      <Image
                        src={card.image}
                        alt={`${card.name} 이미지`}
                        width={170}
                        height={170}
                        className="mt-3 rounded-full bg-grey-0 md:h-[200px] md:w-[200px]"
                      />

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

            <div className="flex justify-center gap-4 pb-5">
              <button onClick={handlePrev}>
                <ChevronUp className="h-6 w-6" aria-label="이전 카드 보기" />
              </button>
              <button onClick={handleNext}>
                <ChevronDown className="h-6 w-6" aria-label="이후 카드 보기" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Makers;
