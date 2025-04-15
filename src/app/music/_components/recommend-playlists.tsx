import { useGetAllPlaylistsByQueryQuery } from "@/hooks/queries/use-get-all-playlists-by-query-query";

const RecommendPlaylists = ({ userId }: { userId: string }) => {
  const { playlists, playlistsError, playlistsPending } =
    useGetAllPlaylistsByQueryQuery(userId);

  return (
    <div>
      {playlistsPending ? (
        <p>추천 플리...</p>
      ) : playlistsError ? (
        <p>오류 발생</p>
      ) : (
        <ul className="grid gap-2">
          {playlists?.map((playlist) => (
            <li key={playlist.id}>{playlist.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecommendPlaylists;
