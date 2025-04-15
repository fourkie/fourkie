import { useGetAllBookmarkedPlaylistsByIdQuery } from "@/hooks/queries/use-get-all-bookmarked-playlists-by-id-query";

const BookmarkedPlaylists = ({ userId }: { userId: string }) => {
  const {
    data: bookmarkedPlaylists,
    isPending,
    isError,
  } = useGetAllBookmarkedPlaylistsByIdQuery(userId);

  return (
    <div>
      {isPending ? (
        <p>즐겨찾기...</p>
      ) : isError ? (
        <p>오류 발생</p>
      ) : (
        <ul className="grid gap-2">
          {bookmarkedPlaylists?.map((playlist) => (
            <li key={playlist.music_playlist_id}>
              {playlist.music_playlist_id}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookmarkedPlaylists;
