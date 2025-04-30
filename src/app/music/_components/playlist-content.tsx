import { Emotion } from "@/constants/spotify.constant";
import { TOAST_MESSAGE } from "@/constants/toast-message.constant";
import useIsMobile from "@/hooks/is-mobile/use-is-mobile";
import { useGetAllBookmarkedPlaylistsByIdQuery } from "@/hooks/queries/use-get-all-bookmarked-playlists-by-id-query";
import { useGetAllPlaylistsByQueryQuery } from "@/hooks/queries/use-get-all-playlists-by-query-query";
import EmptyAlert from "@/ui/common/empty-alert.common";
import { motion } from "framer-motion";
import PlaylistCard from "./playlist-card";

const PlaylistContent = ({
  userId,
  activeTab,
  emotion,
}: {
  userId: string;
  activeTab: string;
  emotion: keyof typeof Emotion;
}) => {
  const { playlists: playlistsData, isPending: playlistsIsPending } =
    useGetAllPlaylistsByQueryQuery(emotion ? Emotion[emotion] : "JOY");

  const isMobile = useIsMobile();

  const { data: bookmarkedData, isPending: bookmarkedIsPending } =
    useGetAllBookmarkedPlaylistsByIdQuery(userId);

  if (activeTab === "firstTab") {
    if (playlistsIsPending)
      return (
        <div className="flex h-full flex-col items-center justify-center gap-2 px-5 py-24 text-center">
          추천 플레이리스트를 불러오는 중입니다. <br />
          <br /> 잠시만 기다려주세요.
        </div>
      );

    return (
      <ul className="grid grid-cols-1 gap-x-10 gap-y-3 bg-white px-5 pb-36 md:mt-3 md:grid-cols-2">
        {playlistsData.map((playlist, index) => {
          const total = playlistsData.length;

          const isLastCard = isMobile
            ? index === total - 1
            : total % 2 === 0
              ? index >= total - 2
              : index === total - 1;

          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: { delay: index * 0.03 },
              }}
              viewport={{ once: true }}
              key={playlist.id}
            >
              <PlaylistCard
                userId={userId}
                playlist={playlist}
                lastCard={isLastCard}
              />
            </motion.div>
          );
        })}
      </ul>
    );
  }

  if (activeTab === "secondTab") {
    if (bookmarkedIsPending) return <>{TOAST_MESSAGE.MUSIC.BOOKMARK_PENDING}</>;

    if (bookmarkedData && bookmarkedData.length === 0)
      return <EmptyAlert text={TOAST_MESSAGE.MUSIC.EMPTY_BOOKMARK} />;

    return (
      <ul className="grid grid-cols-1 gap-x-10 gap-y-3 bg-white px-5 pb-36 md:mt-3 md:grid-cols-2">
        {bookmarkedData?.map((playlist, index) => {
          const key = playlist.id ?? `${playlist.name}-${index}`;
          const total = bookmarkedData.length;

          const isLastCard = isMobile
            ? index === total - 1
            : total % 2 === 0
              ? index >= total - 2
              : index === total - 1;

          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: { delay: index * 0.04 },
              }}
              viewport={{ once: true }}
              key={key}
            >
              <PlaylistCard
                userId={userId}
                playlist={playlist}
                lastCard={isLastCard}
              />
            </motion.div>
          );
        })}
      </ul>
    );
  }

  return null;
};

export default PlaylistContent;
