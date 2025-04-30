"use client";
import { EMOTIONS_QUERY } from "@/constants/emotion.constant";
import { useGetAllPlaylistsByQueryQuery } from "@/hooks/queries/use-get-all-playlists-by-query-query";
import { useGetPostTodayEmotionByIdQuery } from "@/hooks/queries/use-get-posts-today-emotion-by-id-query";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";

const common =
  "p-2 border-2 border-grey-0 md:border-2 md:border-dashed md:border-primary-200 md:rounded-[28px] md:p-3 md:bg-white w-full max-w-[353px] mx-auto";
const commonTitle =
  "mx-auto flex max-w-[353px] pl-3 flex-row gap-4 items-center justify-between w-full transition-all duration-300  pr-1 hover:pr-0";
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
            <ChevronRight className="ml-auto md:h-7 md:w-7 cursor-pointer" />
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
    <div
      className="flex flex-col gap-2"
      role="region"
      aria-label="오늘의 감정 기반 추천 음악"
    >
      <Link href={"/music"}>
        <div className={`${commonTitle}`}>
          <strong className="whitespace-nowrap lg:text-[20px]">
            {EMOTIONS_QUERY[emotion]} 날 추천하는 노래
          </strong>
          <ChevronRight className="ml-auto md:h-7 md:w-7 cursor-pointer" />
        </div>
      </Link>
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`flex flex-row items-center gap-4 rounded-2xl ${common}`}
      >
        <a
          href={playlists[randomIndex].external_urls.spotify}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`스포티파이에서 플레이리스트 열기`}
          className="flex w-full items-center justify-between"
        >
          <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-[10px]">
            <Image
              src={
                playlists[randomIndex].images[0]?.url || "/images/Fluffy.png"
              }
              alt={playlists[randomIndex].name}
              width={64}
              height={64}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="mx-2 flex-1 overflow-hidden">
            {playlists[randomIndex].name.length >= 15 ? (
              <motion.div className="relative w-full overflow-hidden">
                <motion.div
                  className="flex gap-8 whitespace-nowrap text-sm font-bold"
                  animate={{
                    x: ["0%", "-50%"],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 10,
                    ease: "linear",
                  }}
                >
                  <span>{playlists[randomIndex].name}</span>
                  <span>{playlists[randomIndex].name}</span>
                </motion.div>
              </motion.div>
            ) : (
              <div className="truncate text-sm font-bold">
                {playlists[randomIndex].name}
              </div>
            )}
          </div>

          <p className="flex-shrink-0 text-nowrap text-sm text-grey-3">
            {playlists[randomIndex].tracks.total}곡
          </p>
        </a>
      </motion.div>
    </div>
  );
};

export default HomeMusic;
