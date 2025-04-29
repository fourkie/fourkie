import { EMOTIONS } from "@/constants/emotion.constant";
import { useGetUserNicknameQuery } from "@/hooks/queries/use-get-user-nickname-query";
import EmotionImage from "@/ui/common/emotion-image.common";
import { checkEmotion } from "@/utils/home-emotion.util";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

const PostingEmotionModalLoading = () => {
  const [dots, setDots] = useState("");
  const { data: nickname } = useGetUserNicknameQuery();

  // 일정 시간마다 loadingText를 변경
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
      <div className="flex max-w-xs flex-col items-center justify-center gap-7 rounded-lg p-6 text-xl">
        <EmotionImage src={checkEmotion(EMOTIONS.JOY)} size="l" />

        <div className="text-center text-grey-0">
          <strong>
            <span className="text-primary-500">Smookie</span>가 {nickname}
            님의
            <br />
            기분을 분석중이에요.
          </strong>
        </div>

        <div className="text-white">
          <strong>잠시만 기다려 주세요{dots}</strong>!
        </div>

        <Loader size={38} className="animate-spin text-white" />
      </div>
    </div>
  );
};

export default PostingEmotionModalLoading;
