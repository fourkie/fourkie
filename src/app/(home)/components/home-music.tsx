"use client";
import { EMOTIONS_QUERY } from "@/constants/emotion.constant";
import { useGetAllPlaylistsByQueryQuery } from "@/hooks/queries/use-get-all-playlists-by-query-query";
import { useGetPostTodayEmotionByIdQuery } from "@/hooks/queries/use-get-posts-today-emotion-by-id-query";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const common =
  "lg:border-2 lg:border-dashed lg:border-primary-200 lg:rounded-xl lg:p-5 lg:bg-white";
const HomeMusic = ({ userId }: { userId: string }) => {
  const { data } = useGetPostTodayEmotionByIdQuery(userId);

  const emotion: string = data?.[0]?.post_emotion ?? "JOY";

  const { playlists, playlistsPending } =
    useGetAllPlaylistsByQueryQuery(emotion);

  if (playlistsPending) {
    return (
      <div className="flex flex-col gap-4">
        <Link href={"/music"}>
          <div className="mt-2 flex items-center justify-between">
            <div className="font-bold">오늘 추천 음악</div>
            <ChevronRight className="cursor-pointer" />
          </div>
        </Link>
        <div
          className={`flex flex-row items-center gap-4 rounded-xl border bg-primary-50 p-4 ${common}`}
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
    <div className="flex flex-col gap-4">
      <Link href={"/music"}>
        <div className="mt-2 flex items-center justify-between">
          <div className="font-bold">
            {EMOTIONS_QUERY[emotion]} 날 추천하는 노래
          </div>
          <ChevronRight className="cursor-pointer" />
        </div>
      </Link>
      <div
        className={`flex flex-row items-center gap-4 rounded-xl border bg-primary-50 p-3 ${common}`}
      >
        <Link
          href={playlists[randomIndex].external_urls.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-between gap-5"
        >
          <div className="lg:h-30 lg:w-30 h-12 w-14 overflow-hidden rounded-lg">
            <Image
              src={
                playlists[randomIndex].images[0]?.url || "/default-image.jpg"
              }
              alt={playlists[randomIndex].name}
              width={56}
              height={48}
              priority
              className="h-full w-full object-cover"
            />
          </div>

          <p className="flex-1 truncate px-2 font-bold">
            {playlists[randomIndex].name}
          </p>

          <p className="flex-shrink-0 text-right text-sm text-grey-3">
            {playlists[randomIndex].tracks.total}곡
          </p>
        </Link>
      </div>
    </div>
  );
};

export default HomeMusic;
