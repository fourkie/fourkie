import {
  useAddBookmarkMutation,
  useRemoveBookmarkMutation,
} from "@/hooks/mutations/use-music-bookmarks-mutation";
import { SpotifyPlaylistItem } from "../type";

interface PlaylistCardProps {
  playlist: SpotifyPlaylistItem;
  userId: string;
  isBookmarked: boolean;
  onBookmarkToggle: () => void; // 부모로부터 전달받은 함수
}

export const PlaylistCard = ({
  playlist,
  userId,
  isBookmarked,
  onBookmarkToggle, // 부모에서 전달받은 함수
}: PlaylistCardProps) => {
  // const { mutate: addBookmark } = useAddBookmarkMutation();
  // const { mutate: removeBookmark } = useRemoveBookmarkMutation();

  return (
    <div>
      <h3>{playlist.name}</h3>
      <button onClick={onBookmarkToggle}>
        {isBookmarked ? "북마크 삭제" : "북마크 추가"}
      </button>
    </div>
  );
};

export default PlaylistCard;
