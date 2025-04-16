import { useGetAllPlaylistsByQueryQuery } from "@/hooks/queries/use-get-all-playlists-by-query-query";
import PlaylistCard from "./playlist-card";
import { TOAST_MESSAGE } from "@/constants/toast-message.constant";

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
        <p>{TOAST_MESSAGE.MUSIC.PLAYLISTS_PENDING}</p>
      ) : (
        playlists.map((playlist) => (
          <PlaylistCard key={playlist.id} userId={userId} playlist={playlist} />
        ))
      )}
    </ul>
  );
};

export default RecommendPlaylists;
