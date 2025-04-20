import { EMOTIONS_QUERY } from "@/constants/emotion.constant";
import { EMOTIONSMUSIC } from "@/constants/emotions-music.constant";
import EmotionImage from "@/ui/common/emotion-image.common";
import { checkEmotion } from "@/utils/home-emotion.util";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const HomeMusic = () => {
  //데이터 받아오기기
  const data = "SAD";

  return (
    <div className="my-4 flex flex-col gap-4">
      <Link href={"/music"}>
        <div className="mt-2 flex items-center justify-between">
          <div className="font-bold">오늘 추천 음악</div>
          <ChevronRight className="cursor-pointer" />
        </div>
      </Link>
      <div className="flex flex-row items-center gap-4 rounded-xl border bg-primary-50 p-4">
        <EmotionImage src={checkEmotion(data)} size="xs" />
        <div className="flex flex-1 flex-col justify-between">
          <a
            href={`${EMOTIONSMUSIC[data]}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-xl bg-primary-50 p-4"
          >
            <div className="font-bold">
              {EMOTIONS_QUERY[data]}날 추천하는 노래
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomeMusic;
