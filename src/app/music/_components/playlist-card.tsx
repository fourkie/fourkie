import {
  useAddBookmarkMutation,
  useRemoveBookmarkMutation,
} from "@/hooks/mutations/use-music-bookmarks-mutation";
import { useGetAllBookmarkedPlaylistsByIdQuery } from "@/hooks/queries/use-get-all-bookmarked-playlists-by-id-query";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PlaylistCardProps } from "../type";

const PlaylistCard = ({ playlist, userId }: PlaylistCardProps) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    if (textRef.current) {
      const isOverflow =
        textRef.current.scrollWidth > textRef.current.clientWidth;
      setIsOverflowing(isOverflow);
    }
  }, [playlist.name]);

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
    <div className="h-20 border-b border-b-grey-1 last:border-0">
      <div className="justify-arround my-3 flex items-center gap-2 md:flex-row-reverse">
        <button
          className="flex items-center justify-center"
          onClick={handleBookmarkToggle}
          aria-pressed={isBookmarked}
        >
          <Star
            className={`${
              isBookmarked
                ? "fill-secondary-400 text-secondary-200"
                : "text-secondary-200"
            }`}
            size={18}
            aria-hidden="true"
          />
        </button>
        <a
          href={playlist.external_urls.spotify}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${playlist.name} 스포티파이 링크 (새 창 열림)`}
          className="flex w-full items-center gap-6 overflow-hidden whitespace-nowrap transition"
        >
          <div className="h-[52px] w-[62px] overflow-hidden rounded-lg">
            <Image
              src={playlist.images[0].url}
              alt={playlist.name}
              width={62}
              height={52}
              priority
              className="h-full w-full object-cover"
            />
          </div>
          <div className="h-6 flex-1 overflow-hidden">
            <div className="relative" ref={textRef}>
              {isOverflowing ? (
                <motion.div
                  className="absolute left-0 top-0 whitespace-nowrap"
                  animate={{
                    x: ["0%", "-33.333%"],
                    transition: {
                      ease: "linear",
                      duration: 10,
                      repeat: Infinity,
                    },
                  }}
                >
                  <strong className="px-10">{playlist.name}</strong>
                  <strong className="px-10">{playlist.name}</strong>
                  <strong className="px-10">{playlist.name}</strong>
                </motion.div>
              ) : (
                <div className="absolute left-0 top-0 whitespace-nowrap">
                  <strong>{playlist.name}</strong>
                </div>
              )}
            </div>
          </div>
          <p className="mr-7 text-xs text-grey-5">{playlist.tracks.total}곡</p>
        </a>
      </div>
    </div>
  );
};

export default PlaylistCard;
