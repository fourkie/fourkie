import EMOTION_COOKIE_IMAGE_URL from "@/constants/emotions-url.constant";
import EmotionImage from "./emotion-image.common";

const CookieAlert = ({ text }: { text: string }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 pt-24">
      <EmotionImage src={EMOTION_COOKIE_IMAGE_URL.ANXIOUS} size="l" />
      {text}
    </div>
  );
};

export default CookieAlert;
