import EmotionImage from "@/ui/common/emotion-image.common";
import { checkEmotion } from "@/utils/home-emotion.util";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PostingEmotionModalSlideProps } from "../type";

const PostingEmotionModalSlide = ({
  currentEmotionKey,
  emotionKeys,
  setSlideIndex,
}: PostingEmotionModalSlideProps) => {
  // 슬라이드 이동 핸들러
  const handleEmotionSlide = (n: number) => {
    setSlideIndex((prev) => {
      const nextIndex = (prev + n + emotionKeys.length) % emotionKeys.length;
      return nextIndex;
    });
  };

  return (
    <div className="flex items-center justify-center gap-[13px]">
      <ChevronLeft
        onClick={() => handleEmotionSlide(-1)}
        size={32}
        strokeWidth={3}
        className="cursor-pointer stroke-grey-6"
        aria-label="이전 감정으로 이동"
      />

      <EmotionImage src={checkEmotion(currentEmotionKey)} size="m" />

      <ChevronRight
        onClick={() => handleEmotionSlide(1)}
        size={32}
        strokeWidth={3}
        className="cursor-pointer stroke-grey-6"
        aria-label="다음 감정으로 이동"
      />
    </div>
  );
};

export default PostingEmotionModalSlide;
