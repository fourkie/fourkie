import EMOTION_COOKIE_IMAGE_URL from "@/constants/emotions-url.constant";
import { AlertType } from "@/types/cookie-alert.type";
import EmotionImage from "./emotion-image.common";

const CookieAlert = ({ text, isContent = false }: AlertType) => {
  let common = "flex flex-col items-center justify-center gap-6 ";
  let size = "xs";

  if (!isContent) {
    size = "l";
    common = common + " pt-24";
  }

  return (
    <div className={`${common}`}>
      <EmotionImage src={EMOTION_COOKIE_IMAGE_URL.ANXIOUS} size={`${size}`} />
      {text}
    </div>
  );
};

export default CookieAlert;
