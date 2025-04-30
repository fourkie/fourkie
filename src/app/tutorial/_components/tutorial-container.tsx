"use client";

import { TUTORIAL } from "@/constants/tutorial.constant";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { TutorialKeys } from "../type";
import TutorialDescription from "./tutorial-description";

const TutorialContainer = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from");

  /** 튜토리얼 데이터 배열 구성 */
  const tutorialSteps = [
    { key: "HOME" as TutorialKeys },
    { key: "LIST" as TutorialKeys },
    { key: "MUSIC" as TutorialKeys },
    { key: "FRIEND" as TutorialKeys },
    { key: "SMOOKIE" as TutorialKeys },
  ];

  /** 클릭 시 로그인 페이지로 넘어감 */
  const handleTutorialEnd = () => {
    document.cookie = "hasSeenTutorial=true; path=/; max-age=31536000";

    if (from === "my-page") router.push("/my-page");
    else if (from === "footer") router.push("/");
    else router.push("/sign-up");
  };

  /** 클릭 시 다음 페이지로 넘어감 */
  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1 && swiperRef.current) {
      swiperRef.current.slideNext();
    } else {
      handleTutorialEnd();
    }
  };

  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      onSlideChange={(swiper) => setCurrentStep(swiper.activeIndex)}
      onSwiper={(swiper) => {
        swiperRef.current = swiper;
      }}
    >
      {tutorialSteps.map((step) => (
        <SwiperSlide key={step.key}>
          <TutorialDescription
            title={TUTORIAL.TITLE[step.key]}
            description={TUTORIAL.DESCRIPTION[step.key]}
            image={TUTORIAL.IMAGE[step.key]}
            currentStep={currentStep}
            onClick={handleNext}
            onDotClick={setCurrentStep}
            buttonName={
              step.key === "SMOOKIE"
                ? from === "my-page"
                  ? "마이페이지로 돌아가기"
                  : from === "footer"
                    ? "돌아가기"
                    : TUTORIAL.BUTTON.SIGN_UP
                : TUTORIAL.BUTTON.NEXT
            }
            isFromMypage={from === "my-page"}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TutorialContainer;
