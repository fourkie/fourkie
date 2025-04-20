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
    <div className="h-18">
      <div className="justify-arround mt-4 flex h-[52px] items-center gap-3 border-b-[1px] border-b-grey-1 pb-6">
        <button
          className="flex items-center justify-center"
          onClick={handleBookmarkToggle}
        >
          <Star
            className={`h-[18px] ${
              isBookmarked
                ? "fill-yellow-400 text-yellow-400"
                : "text-yellow-400"
            }`}
            size={24}
          />
        </button>
        {/* 이미지 수정 */}
        <Link
          href={playlist.external_urls.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-between gap-4 whitespace-nowrap"
        >
          <div className="flex h-[50px] w-12 items-center justify-center overflow-hidden">
            <Image
              src={playlist.images[0]?.url || "/default-image.jpg"}
              alt={playlist.name}
              width={52}
              height={52}
              className="object-fit rounded-l"
            />
          </div>
          <p className="line-clamp-1 w-52 text-ellipsis whitespace-nowrap font-bold">
            {playlist.name}
          </p>
          <p className="break-all text-sm text-grey-3">
            {playlist.tracks.total}곡
          </p>
        </Link>
      </div>
    </div>
  );
};

export default PlaylistCard;
