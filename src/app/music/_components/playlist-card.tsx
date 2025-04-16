import { useState } from "react";
import { SpotifyPlaylistItem } from "../type";
import Image from "next/image";
import { Star } from "lucide-react";
import Link from "next/link";

interface PlaylistCardProps {
  playlist: SpotifyPlaylistItem;
  // onBookmarkToggle: (playlistId: string) => void; // 북마크 추가 / 삭제함수
}

export const PlaylistCard = ({ playlist }: PlaylistCardProps) => {
  const [isBookmarkedState, setIsBookmarkedState] = useState(false);

  const handleBookmarkToggle = () => {
    // onBookmarkToggle(playlist.id);
    console.log("setIsBookmarkedState", !isBookmarkedState);
    setIsBookmarkedState(!isBookmarkedState); // 버튼 클릭 후 상태 변경

    if (isBookmarkedState == false) {
      // 북마크 추가
      console.log("북마크 추가");
      // addBookmark(playlist);
    } else if (isBookmarkedState == true) {
      // 북마크 삭제
      console.log("북마크 삭제");
    }
  };

  // const { mutate: addBookmark } = useAddBookmarkMutation();
  // const { mutate: removeBookmark } = useRemoveBookmarkMutation();

  return (
    <div className="flex items-center justify-start">
      <button className="bookmark-button" onClick={handleBookmarkToggle}>
        <Star
          className={
            isBookmarkedState
              ? "fill-yellow-500 text-yellow-500"
              : "text-yellow-500"
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
