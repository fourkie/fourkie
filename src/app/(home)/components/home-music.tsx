"use client";

import { useRouter } from "next/navigation";
import {
  ChevronRight,
  StepBack,
  StretchVertical,
  StepForward,
} from "lucide-react";
import EmotionImage from "@/ui/common/emotion-image.common";
import EMOTION_COOKIE_IMAGE_URL from "@/constants/emotions-url.constant";

const HomeMusic = () => {
  const route = useRouter();
  const handleHomeMusic = () => {
    route.push("/music");
  };
  return (
    <div>
      <div
        className="flex justify-between items-center"
        onClick={() => {
          handleHomeMusic();
        }}
      >
        <div className="text-xl font-bold">오늘 추천 음악</div>
        <ChevronRight className="cursor-pointer" />
      </div>
      <div className="border rounded-xl bg-primary-200 flex flex-row gap-4 p-4">
        <EmotionImage src={EMOTION_COOKIE_IMAGE_URL.SAD} size="xs" />
        <div className="flex flex-col justify-between flex-1">
          <div className="text-xl font-bold">땡땡할 때 듣기 좋은 음악</div>
          <div>가수</div>
          <div className="flex justify-between items-center">
            <StepBack /> <StretchVertical /> <StepForward />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeMusic;
