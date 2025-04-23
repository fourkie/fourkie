"use client";

import { TUTORIAL } from "@/constants/tutorial.constant";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import TutorialDescription from "./_components/tutorial-description";

const Tutorial = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();

  // 마이페이지에서 튜토리얼 켜면 마이페이지로 다시 돌아가도록 추가했습니다!
  const isFromMypage = searchParams.get("from") === "my-page";

  /** 클릭 시 다음 페이지로 넘어감 */
  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  /** 클릭 시 로그인 페이지로 넘어감 */
  const handleTutorialEnd = () => {
    document.cookie = "hasSeenTutorial=true; path=/; max-age=31536000";
    router.push(isFromMypage ? "/my-page" : "/sign-in");
  };

  return (
    <>
      {currentStep === 0 && (
        <TutorialDescription
          title={TUTORIAL.TITLE.HOME}
          description={TUTORIAL.DESCRIPTION.HOME}
          image={TUTORIAL.IMAGE.HOME}
          currentStep={currentStep}
          onClick={handleNext}
          buttonName={TUTORIAL.BUTTON.NEXT}
        />
      )}

      {currentStep === 1 && (
        <TutorialDescription
          title={TUTORIAL.TITLE.LIST}
          description={TUTORIAL.DESCRIPTION.LIST}
          image={TUTORIAL.IMAGE.LIST}
          currentStep={currentStep}
          onClick={handleNext}
          buttonName={TUTORIAL.BUTTON.NEXT}
        />
      )}

      {currentStep === 2 && (
        <TutorialDescription
          title={TUTORIAL.TITLE.MUSIC}
          description={TUTORIAL.DESCRIPTION.MUSIC}
          image={TUTORIAL.IMAGE.MUSIC}
          currentStep={currentStep}
          onClick={handleNext}
          buttonName={TUTORIAL.BUTTON.NEXT}
        />
      )}

      {currentStep === 3 && (
        <TutorialDescription
          title={TUTORIAL.TITLE.SMOOKIE}
          description={TUTORIAL.DESCRIPTION.SMOOKIE}
          image={TUTORIAL.IMAGE.SMOOKIE}
          currentStep={currentStep}
          onClick={handleTutorialEnd}
          buttonName={
            isFromMypage ? "마이페이지로 돌아가기" : TUTORIAL.BUTTON.LOGIN
          }
        />
      )}
    </>
  );
};

export default Tutorial;
