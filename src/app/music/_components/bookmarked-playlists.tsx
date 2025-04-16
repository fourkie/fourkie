import { useGetAllBookmarkedPlaylistsByIdQuery } from "@/hooks/queries/use-get-all-bookmarked-playlists-by-id-query";
import PlaylistCard from "./playlist-card";

const BookmarkedPlaylists = ({ userId }: { userId: string }) => {
  const { data, isPending } = useGetAllBookmarkedPlaylistsByIdQuery(userId);

  console.log("userId : ", userId);
  console.log("북마크된 플레이리스트 데이터 : ", data);

  const playlists = data?.map((item) => item.music_playlist_id);
  if (isPending) return <p>로딩 중...</p>;

  return (
    <ul className="flex flex-col gap-4">
      {playlists?.map((playlist) => (
        <PlaylistCard
          key={playlist.id}
          userId={userId}
          playlist={playlist}
          isBookmarked={true}
          onBookmarkToggle={() => {
            console.log(`(북마크 탭) ${playlist.name} 클릭됨`);
            // 실제 API 호출 자리
          }}
        />
      ))}
    </ul>
  );
};

export default BookmarkedPlaylists;
