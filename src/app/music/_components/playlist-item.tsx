import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PlaylistItemProps } from "../type";

export const PlaylistItem = ({
  playlist,
  bookmarked,
  onToggleBookmark,
}: PlaylistItemProps) => {
  const playlistUrl = playlist.url || playlist.external_urls.spotify; // url이 없으면 external_urls.spotify 사용

  return (
    <div className="flex items-center justify-start gap-4 mb-4">
      <button onClick={() => onToggleBookmark(playlist.id)}>
        <Star
          className={`w-6 h-6 ${
            bookmarked ? "fill-yellow-400 text-yellow-400" : "text-gray-400"
          }`}
        />
      </button>
      <Image
        src={playlist.images?.[0]?.url}
        alt={playlist.name}
        width={50}
        height={50}
      />
      <p>{playlist.name}</p>
      <p>총 곡 수 {playlist.tracks.total}</p>
      {playlistUrl && (
        <Link href={playlistUrl} target="_blank">
          <button>보기</button>
        </Link>
      )}
    </div>
  );
};
