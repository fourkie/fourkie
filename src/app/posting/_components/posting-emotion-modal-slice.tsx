import { ChevronLeft, ChevronRight } from "lucide-react";
import EmotionImage from "@/ui/common/emotion-image.common";
import { PostingEmotionModalSlideProps } from "../type";
import EMOTION_COOKIE_IMAGE_URL from "@/constants/emotions-url.constant";

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
    <div className="flex items-center justify-center gap-5">
      <ChevronLeft
        onClick={() => handleEmotionSlide(-1)}
        size={32}
        strokeWidth={3}
        className="stroke-grey-6 cursor-pointer"
      />

      <EmotionImage
        src={EMOTION_COOKIE_IMAGE_URL[currentEmotionKey]}
        size="m"
      />

      <ChevronRight
        onClick={() => handleEmotionSlide(1)}
        size={32}
        strokeWidth={3}
        className="stroke-grey-6 cursor-pointer"
      />
    </div>
  );
};

export default PostingEmotionModalSlide;
