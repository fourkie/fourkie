import {
  useAddBookmarkMutation,
  useRemoveBookmarkMutation,
} from "@/hooks/mutations/use-music-bookmarks-mutation";
import { useGetAllBookmarkedPlaylistsByIdQuery } from "@/hooks/queries/use-get-all-bookmarked-playlists-by-id-query";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PlaylistCardProps } from "../type";

const PlaylistCard = ({ playlist, userId }: PlaylistCardProps) => {
  const musicPlaylistId = playlist.id || playlist.music_playlist_id;

  const { mutate: addBookmark } = useAddBookmarkMutation();
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
    <div className="h-20 border-b border-b-grey-1 last:border-none">
      <div className="justify-arround my-3 flex items-center gap-2">
        <button
          className="flex items-center justify-center"
          onClick={handleBookmarkToggle}
        >
          <Star
            className={`${
              isBookmarked
                ? "fill-secondary-400 text-secondary-200"
                : "text-secondary-200"
            }`}
            size={18}
          />
        </button>
        <Link
          href={playlist.external_urls.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center gap-5 overflow-hidden whitespace-nowrap transition"
        >
          <div className="h-12 w-14 overflow-hidden rounded-lg">
            <Image
              src={playlist.images[0].url}
              alt={playlist.name}
              width={56}
              height={48}
              priority
              className="h-full w-full object-cover"
            />
          </div>
          <p className="flex-1 truncate text-base font-bold">{playlist.name}</p>
          <p className="text-xs text-grey-5">{playlist.tracks.total}곡</p>
        </Link>
      </div>
    </div>
  );
};

export default PlaylistCard;
