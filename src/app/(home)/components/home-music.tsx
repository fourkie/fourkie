"use client";
import { EMOTIONS_QUERY } from "@/constants/emotion.constant";
import { EMOTIONSMUSIC } from "@/constants/emotions-music.constant";
import { useGetPostTodayEmotionByIdQuery } from "@/hooks/queries/use-get-posts-today-emotion-by-id-query";
import EmotionImage from "@/ui/common/emotion-image.common";
import { checkEmotion } from "@/utils/home-emotion.util";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const HomeMusic = ({ userId }: { userId: string }) => {
  const { data: data1, isPending } = useGetPostTodayEmotionByIdQuery(userId);

  if (isPending || data1 === undefined) {
    return (
      <div className="my-4 flex flex-col gap-4">
        <Link href={"/music"}>
          <div className="mt-2 flex items-center justify-between">
            <div className="font-bold">오늘 추천 음악</div>
            <ChevronRight className="cursor-pointer" />
          </div>
        </Link>
        <div className="flex flex-row items-center gap-4 rounded-xl border bg-primary-50 p-4">
          <EmotionImage src={checkEmotion("JOY")} size="xs" />
          <div className="flex flex-1 flex-col justify-between">
            <a
              href={`${EMOTIONSMUSIC["JOY"]}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl bg-primary-50 p-4"
            >
              <div className="font-bold">
                {EMOTIONS_QUERY["JOY"]}날 추천하는 노래
              </div>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-4 flex flex-col gap-4">
      <Link href={"/music"}>
        <div className="mt-2 flex items-center justify-between">
          <div className="font-bold">오늘 추천 음악</div>
          <ChevronRight className="cursor-pointer" />
        </div>
      </Link>
      <div className="flex flex-row items-center gap-4 rounded-xl border bg-primary-50 p-4">
        <EmotionImage src={checkEmotion(data1[0]?.post_emotion)} size="xs" />
        <div className="flex flex-1 flex-col justify-between">
          <a
            href={`${EMOTIONSMUSIC[data1[0]?.post_emotion]}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-xl bg-primary-50 p-4"
          >
            <div className="font-bold">
              {EMOTIONS_QUERY[data1[0]?.post_emotion]}날 추천하는 노래
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomeMusic;
