import { ChevronRight } from "lucide-react";
import EmotionImage from "@/ui/common/emotion-image.common";
import EMOTION_COOKIE_IMAGE_URL from "@/constants/emotions-url.constant";
import Link from "next/link";

const HomeMusic = () => {
  return (
    <div className="flex flex-col my-4 gap-2">
      <Link href={"/music"}>
        <div className="flex justify-between items-center mt-6">
          <div className="text-xl font-bold">오늘 추천 음악</div>
          <ChevronRight className="cursor-pointer" />
        </div>
      </Link>
      <div className="border rounded-xl bg-primary-50 flex flex-row items-center gap-4 p-4">
        <EmotionImage src={EMOTION_COOKIE_IMAGE_URL.JOY} size="s" />
        <div className="flex flex-col justify-between flex-1">
          <Link
            href={"https://open.spotify.com/playlist/5oKWX70uCr0CfN3GpMbMfz"}
          >
            <div className="text-xl font-bold">잔잔할 때 들을 노래</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeMusic;
