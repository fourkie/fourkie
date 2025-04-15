import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PlaylistCardProps {
  playlist: any;
  isBookmarked: boolean;
  onBookmarkToggle: () => void;
}

const PlaylistCard = ({
  playlist,
  isBookmarked,
  onBookmarkToggle,
}: PlaylistCardProps) => {
  const playlistUrl = playlist.uri || playlist.external_urls?.spotify;

  return (
    <div className="flex items-center justify-start gap-4">
      {/* 북마크 버튼 */}
      <button onClick={onBookmarkToggle} aria-label="즐겨찾기 토글">
        {isBookmarked ? (
          <Star className="fill-yellow-500 text-yellow-500" />
        ) : (
          <Star className="text-yellow-500 " />
        )}
      </button>
      <Image
        src={playlist.images?.[0]?.url}
        alt={playlist.name}
        width={50}
        height={50}
      />
      <div className="flex flex-col">
        <p>{playlist.name}</p>
        <p>총 곡 수 {playlist.tracks?.total}</p>
        {playlistUrl && (
          <Link href={playlistUrl} target="_blank">
            <button className="text-sm underline text-blue-500">보기</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default PlaylistCard;
