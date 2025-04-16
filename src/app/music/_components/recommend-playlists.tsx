import { useGetAllPlaylistsByQueryQuery } from "@/hooks/queries/use-get-all-playlists-by-query-query";
import PlaylistCard from "./playlist-card";
import { Emotion } from "@/constants/spotify.constant";

type RecommendPlaylistsProps = {
  userId: string;
  emotion: Emotion;
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
