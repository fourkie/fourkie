import { TOAST_MESSAGE } from "@/constants/toast-message.constant";
import { useGetAllBookmarkedPlaylistsByIdQuery } from "@/hooks/queries/use-get-all-bookmarked-playlists-by-id-query";
import PlaylistCard from "./playlist-card";

const BookmarkedPlaylists = ({ userId }: { userId: string }) => {
  const {
    data: bookmarkedData,
    isPending: bookmarkedIsPending,
    error: bookmarkedIsError,
  } = useGetAllBookmarkedPlaylistsByIdQuery(userId);

  if (bookmarkedData && bookmarkedData.length === 0)
    return TOAST_MESSAGE.MUSIC.EMPTY_BOOKMARK;

  if (bookmarkedIsPending) return TOAST_MESSAGE.MUSIC.BOOKMARK_PENDING;

  if (bookmarkedIsError) return TOAST_MESSAGE.MUSIC.BOOKMARK_ERROR;

  return (
    <ul className="flex flex-col gap-3">
      {bookmarkedData?.map((playlist, index) => {
        const key = playlist.id ?? `${playlist.name}-${index}`;

        return <PlaylistCard key={key} playlist={playlist} userId={userId} />;
      })}
    </ul>
  );
};

export default BookmarkedPlaylists;
