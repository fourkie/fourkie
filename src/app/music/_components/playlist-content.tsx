import { Emotion } from "@/constants/spotify.constant";
import { TOAST_MESSAGE } from "@/constants/toast-message.constant";
import { useGetAllBookmarkedPlaylistsByIdQuery } from "@/hooks/queries/use-get-all-bookmarked-playlists-by-id-query";
import { useGetAllPlaylistsByQueryQuery } from "@/hooks/queries/use-get-all-playlists-by-query-query";
import CookieAlert from "@/ui/common/cookie-alert.common";
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
  // 추천 플리
  const {
    playlists: playlistsData,
    isPending: playlistsIsPending,
    error: playlistsError,
  } = useGetAllPlaylistsByQueryQuery(emotion ? Emotion[emotion] : "JOY");

  // 즐겨찾기
  const {
    data: bookmarkedData,
    isPending: bookmarkedIsPending,
    error: bookmarkedError,
  } = useGetAllBookmarkedPlaylistsByIdQuery(userId);

  // 추천 플리 탭
  if (activeTab === "firstTab") {
    if (playlistsIsPending)
      return <CookieAlert text={TOAST_MESSAGE.MUSIC.PLAYLISTS_PENDING} />;

    if (playlistsError)
      return <CookieAlert text={TOAST_MESSAGE.MUSIC.PLAYLISTS_ERROR} />;

    return (
      <ul className="grid grid-cols-1 gap-x-10 gap-y-3 bg-white px-5 pb-36 md:grid-cols-2">
        {playlistsData.map((playlist, index) => {
          const total = playlistsData.length;

          const isLastCard =
            total % 2 === 0
              ? index === total - 1 || index === total - 2
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

  // 즐겨찾기 탭
  if (activeTab === "secondTab") {
    if (bookmarkedIsPending)
      return <CookieAlert text={TOAST_MESSAGE.MUSIC.BOOKMARK_PENDING} />;

    if (bookmarkedError)
      return <CookieAlert text={TOAST_MESSAGE.MUSIC.BOOKMARK_ERROR} />;

    if (bookmarkedData && bookmarkedData.length === 0)
      return <CookieAlert text={TOAST_MESSAGE.MUSIC.EMPTY_BOOKMARK} />;

    return (
      <ul className="grid grid-cols-1 gap-x-10 gap-y-3 bg-white px-5 pb-36 md:grid-cols-2">
        {bookmarkedData?.map((playlist, index) => {
          const key = playlist.id ?? `${playlist.name}-${index}`;
          const total = playlistsData.length;

          const isLastCard =
            total % 2 === 0
              ? index === total - 1 || index === total - 2
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
