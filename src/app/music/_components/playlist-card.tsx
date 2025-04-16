import {
  useAddBookmarkMutation,
  useRemoveBookmarkMutation,
} from "@/hooks/mutations/use-music-bookmarks-mutation";
import { useGetAllBookmarkedPlaylistsByIdQuery } from "@/hooks/queries/use-get-all-bookmarked-playlists-by-id-query";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SpotifyPlaylistItem } from "../type";

interface PlaylistCardProps {
  playlist: SpotifyPlaylistItem;
  userId: string;
}

export const PlaylistCard = ({ playlist, userId }: PlaylistCardProps) => {
  const musicPlaylistId = playlist.id || playlist.music_playlist_id;

  const { mutate: addBookmark } = useAddBookmarkMutation(userId);
  const { mutate: removeBookmark } = useRemoveBookmarkMutation({
    musicPlaylistId,
    userId,
  });

  const { data: bookmarkedIds } = useGetAllBookmarkedPlaylistsByIdQuery(userId);

  const isBookmarked = bookmarkedIds?.some(
    (item) => item.music_playlist_id === musicPlaylistId,
  );

  const handleBookmarkToggle = () => {
    if (isBookmarked == false) {
      // 북마크 추가
      addBookmark({ ...playlist, userId });
    } else if (isBookmarked == true) {
      // 북마크 삭제
      removeBookmark({ musicPlaylistId, userId });
    }
  };

  return (
    <div className="flex items-center justify-start">
      <button className="bookmark-button" onClick={handleBookmarkToggle}>
        <Star
          className={
            isBookmarked ? "fill-yellow-500 text-yellow-500" : "text-yellow-500"
          }
          size={24}
        />
      </button>

      <Image
        src={playlist.images[0]?.url || "/default-image.jpg"}
        alt={playlist.name}
        width={50}
        height={50}
      />

      <h3>{playlist.name}</h3>

      <p>{playlist.tracks.total}곡</p>

      <Link
        href={playlist.external_urls.spotify}
        target="_blank"
        rel="noopener noreferrer"
      >
        Spotify
      </Link>
    </div>
  );
};

export default PlaylistCard;
