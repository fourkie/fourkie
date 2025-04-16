import { useAddBookmarkMutation } from "@/hooks/mutations/use-music-bookmarks-mutation";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BookmarkMutationPayload, SpotifyPlaylistItem } from "../type";

interface PlaylistCardProps {
  userId: string;
  playlist: SpotifyPlaylistItem;
  isBookmarked: boolean;
  onBookmarkToggle: () => void;
}

const PlaylistCard = ({
  userId,
  playlist,
  isBookmarked,
  onBookmarkToggle,
}: PlaylistCardProps) => {
  const playlistUrl = playlist.uri || playlist.external_urls?.spotify;
  console.log(userId);

  const { mutate: addBookmark } = useAddBookmarkMutation();

  // 북마크 추가 / 제거 핸들러
  const handleBookmarkToggle = () => {
    const payload: BookmarkMutationPayload = {
      music_playlist_id: playlist.id,
      name: playlist.name,
      external_urls: playlist.external_urls,
      images: playlist.images,
      tracks: playlist.tracks,
      uri: playlist.uri,
    };

    onBookmarkToggle();
    addBookmark(payload);
  };

  return (
    <div className="playlist-card">
      <Image
        src={playlist.images?.[0]?.url || "/default-image.png"}
        alt={playlist.name}
        width={50}
        height={50}
      />
      <div className="flex flex-col">
        <p className="text-lg font-bold">{playlist.name}</p>
        {playlistUrl && (
          <Link href={playlistUrl} target="_blank">
            <button className="text-sm underline text-blue-500">보기</button>
          </Link>
        )}
        <button
          aria-label="즐겨찾기 토글"
          onClick={handleBookmarkToggle}
          className="flex items-center mt-2"
        >
          <Star
            className={`w-5 h-5 ${
              isBookmarked ? "text-yellow-500" : "text-gray-400"
            }`}
          />
          <span className="ml-2 text-sm">
            {isBookmarked ? "북마크됨" : "북마크 추가"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default PlaylistCard;
