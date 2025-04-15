import { CACHE_STALE_TIME } from "@/constants/music-constant";
import { QUERY_KEY } from "@/constants/query-keys.constant";
import { fetchBookmarkedPlaylists } from "@/services/music-bookmark-service";
import { useQuery } from "@tanstack/react-query";

// 유저의 북마크된 플레이리스트 목록 조회
export const useGetAllBookmarkedPlaylistsByIdQuery = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.BOOKMARKED_PLAYLISTS, userId],
    queryFn: () => fetchBookmarkedPlaylists(userId),
    enabled: !!userId, // userId가 없으면 쿼리 실행 안함
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: CACHE_STALE_TIME, // 10분
  });
};
