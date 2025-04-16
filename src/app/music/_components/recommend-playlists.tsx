import { useGetAllPlaylistsByQueryQuery } from "@/hooks/queries/use-get-all-playlists-by-query-query";
import PlaylistCard from "./playlist-card";

type RecommendPlaylistsProps = {
  userId: string;
  emotion: string;
};

const RecommendPlaylists = ({ userId, emotion }: RecommendPlaylistsProps) => {
  const { playlists, playlistsPending } =
    useGetAllPlaylistsByQueryQuery(emotion);

  return (
    <ul className="flex flex-col gap-4">
      {playlistsPending ? (
        <li>로딩 중...</li>
      ) : (
        playlists.map((playlist) => (
          <PlaylistCard key={playlist.id} userId={userId} playlist={playlist} />
        ))
      )}
    </ul>
  );
};

export default RecommendPlaylists;
