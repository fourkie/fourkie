"use client";
import { EMOTIONS_QUERY } from "@/constants/emotion.constant";
import { useGetAllPlaylistsByQueryQuery } from "@/hooks/queries/use-get-all-playlists-by-query-query";
import { useGetPostTodayEmotionByIdQuery } from "@/hooks/queries/use-get-posts-today-emotion-by-id-query";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const common =
  "p-2 border-2 border-grey-0 md:border-2 md:border-dashed md:border-primary-200 md:rounded-[28px] md:p-3 md:bg-white w-full max-w-[353px] mx-auto";
const commonTitle = "mx-auto flex max-w-[353px] flex-row gap-4  w-full";
const HomeMusic = ({ userId }: { userId: string }) => {
  const { data } = useGetPostTodayEmotionByIdQuery(userId);

  const emotion: string = data?.[0]?.post_emotion ?? "JOY";

  const { playlists, isPending } = useGetAllPlaylistsByQueryQuery(emotion);

  if (isPending) {
    return (
      <div className="flex flex-col gap-2">
        <Link href={"/music"}>
          <div className={`${commonTitle}`}>
            <strong className="whitespace-nowrap lg:text-[20px]">
              오늘 추천 음악
            </strong>
            <ChevronRight className="ml-auto cursor-pointer" />
          </div>
        </Link>
        <div
          className={`flex flex-row items-center gap-4 rounded-2xl ${common}`}
        >
          <div className="flex flex-1 flex-col justify-between">
            플레이리스트를 불러오고 있습니다!
          </div>
        </div>
      </div>
    );
  }
  const playNum = playlists.length;
  const randomIndex = playNum > 0 ? Math.floor(Math.random() * playNum) : 1;

  return (
    <div className="flex flex-col gap-2">
      <Link href={"/music"}>
        <div className={`${commonTitle}`}>
          <strong className="whitespace-nowrap lg:text-[20px]">
            {EMOTIONS_QUERY[emotion]} 날 추천하는 노래
          </strong>
          <ChevronRight className="ml-auto cursor-pointer" />
        </div>
      </Link>
      <div className={`flex flex-row items-center gap-4 rounded-2xl ${common}`}>
        <a
          href={playlists[randomIndex].external_urls.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center gap-2"
        >
          <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md md:text-[14px] lg:min-h-[102px] lg:min-w-[118px] lg:rounded-[28px]">
            <Image
              src={
                playlists[randomIndex].images[0]?.url || "/images/Fluffy.png"
              }
              alt={playlists[randomIndex].name}
              width={64}
              height={64}
              priority
              className="h-full w-full object-cover"
            />
          </div>

          <strong className="flex-1 truncate px-1 text-sm">
            {playlists[randomIndex].name}
          </strong>

          <p className="flex-shrink-0 text-nowrap text-sm text-grey-3">
            {playlists[randomIndex].tracks.total}곡
          </p>
        </a>
      </div>
    </div>
  );
};

export default HomeMusic;
