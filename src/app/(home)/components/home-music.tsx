import EMOTION_COOKIE_IMAGE_URL from "@/constants/emotions-url.constant";
import EmotionImage from "@/ui/common/emotion-image.common";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const HomeMusic = () => {
  return (
    <div className="my-4 flex flex-col gap-4">
      <Link href={"/music"}>
        <div className="mt-2 flex items-center justify-between">
          <div className="font-bold">오늘 추천 음악</div>
          <ChevronRight className="cursor-pointer" />
        </div>
      </Link>
      <div className="flex flex-row items-center gap-4 rounded-xl border bg-primary-50 p-4">
        <EmotionImage src={EMOTION_COOKIE_IMAGE_URL.JOY} size="xs" />
        <div className="flex flex-1 flex-col justify-between">
          <a
            href="https://open.spotify.com/playlist/5oKWX70uCr0CfN3GpMbMfz"
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-xl bg-primary-50 p-4"
          >
            <div className="font-bold">잔잔할 때 들을 노래</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomeMusic;
