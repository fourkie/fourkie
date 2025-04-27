import { Emotion } from "@/constants/spotify.constant";
import { TOAST_MESSAGE } from "@/constants/toast-message.constant";
import { useGetAllBookmarkedPlaylistsByIdQuery } from "@/hooks/queries/use-get-all-bookmarked-playlists-by-id-query";
import { useGetAllPlaylistsByQueryQuery } from "@/hooks/queries/use-get-all-playlists-by-query-query";
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
      return <p>{TOAST_MESSAGE.MUSIC.PLAYLISTS_PENDING}</p>;
    if (playlistsError) return <p>{TOAST_MESSAGE.MUSIC.PLAYLISTS_ERROR}</p>;

    return (
      <ul className="grid grid-cols-1 gap-x-10 gap-y-3 bg-white md:grid-cols-2">
        {playlistsData.map((playlist) => (
          <PlaylistCard key={playlist.id} userId={userId} playlist={playlist} />
        ))}
      </ul>
    );
  }

  // 즐겨찾기 탭
  if (activeTab === "secondTab") {
    if (bookmarkedIsPending)
      return <p>{TOAST_MESSAGE.MUSIC.BOOKMARK_PENDING}</p>;

    if (bookmarkedError) return <p>{TOAST_MESSAGE.MUSIC.BOOKMARK_ERROR}</p>;

    if (bookmarkedData && bookmarkedData.length === 0)
      return <p>{TOAST_MESSAGE.MUSIC.EMPTY_BOOKMARK}</p>;

    return (
      <ul className="flex flex-col gap-3 bg-white px-5">
        {bookmarkedData?.map((playlist, index) => {
          const key = playlist.id ?? `${playlist.name}-${index}`;
          return <PlaylistCard key={key} playlist={playlist} userId={userId} />;
        })}
      </ul>
    );
  }

  return null;
};

export default PlaylistContent;
