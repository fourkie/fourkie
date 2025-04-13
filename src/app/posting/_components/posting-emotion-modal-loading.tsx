import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import EmotionImage from "@/ui/common/emotion-image.common";
import { checkEmotion } from "@/utils/home-emotion.util";

type PostingEmotionModalLoadingProps = {
  nickname: string | undefined;
};

const PostingEmotionModalLoading = ({
  nickname,
}: PostingEmotionModalLoadingProps) => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    // 일정 시간마다 loadingText를 변경
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="flex flex-col items-center justify-center text-white p-4 rounded-lg max-w-xs text-xl font-bold">
        <EmotionImage src={checkEmotion("JOY")} size="l" />
        <br />

        <div className="text-center mb-6">
          <p className="mb-2">
            <span className="text-primary-400">Smookie</span>가 {nickname}님의
            <br />
            기분을 분석중이에요.
          </p>
          <p className="text-white">잠시만 기다려 주세요{dots}!</p>
        </div>

        <div className="animate-spin mb-6">
          <Loader className="h-9 w-9 text-white" />
        </div>
      </div>
    </div>
  );
};

export default PostingEmotionModalLoading;
