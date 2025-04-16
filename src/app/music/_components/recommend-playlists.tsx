import { TOAST_MESSAGE } from "@/constants/toast-message.constant";
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
    <ul className="flex flex-col gap-[12px]">
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
