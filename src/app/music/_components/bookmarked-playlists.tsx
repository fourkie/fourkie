// src/components/music/_components/bookmarked-playlists.tsx

import { useGetAllBookmarkedPlaylistsByIdQuery } from "@/hooks/queries/use-get-all-bookmarked-playlists-by-id-query";
import PlaylistCard from "./playlist-card";
import { SpotifyPlaylistItem } from "../type";
import { removeBookmarkedPlaylists } from "@/services/music-bookmark-service";

const BookmarkedPlaylists = ({ userId }: { userId: string }) => {
  const { data, isPending, isError } =
    useGetAllBookmarkedPlaylistsByIdQuery(userId);

  // 로딩 및 오류 상태 처리
  if (isPending) return <p>로딩 중...</p>;
  if (isError || !data) return <p>오류가 발생했습니다. 다시 시도해주세요.</p>;

  // 북마크된 플레이리스트가 없는 경우 처리
  if (data.length === 0) {
    return <p>북마크한 플레이리스트가 없어요!</p>;
  }

  // 플레이리스트 데이터 필터링 (타입 안전성 보장)
  const playlists = data
    .map((item) => item.music_playlist_id)
    .filter((playlist): playlist is SpotifyPlaylistItem =>
      Boolean(playlist?.id),
    );

  // 북마크 제거 처리
  const handleBookmarkToggle = (playlist: SpotifyPlaylistItem) => {
    removeBookmarkedPlaylists(playlist.id, userId);
  };

  return (
    <ul className="flex flex-col gap-4">
      {playlists.map((playlist) => (
        <PlaylistCard
          key={playlist.id}
          userId={userId}
          playlist={playlist}
          isBookmarked={true}
          onBookmarkToggle={() => handleBookmarkToggle(playlist)}
        />
      ))}
    </ul>
  );
};

export default BookmarkedPlaylists;
