import { QUERY_KEY } from "@/constants/query-keys.constant";
import { CACHE_STALE_TIME } from "@/constants/spotify.constant";
import { fetchBookmarkedPlaylists } from "@/services/music-bookmark-service";
import { useQuery } from "@tanstack/react-query";

// 유저의 북마크된 플레이리스트 목록 조회
export const useGetAllBookmarkedPlaylistsByIdQuery = (
  userId: string | null,
) => {
  return useQuery({
    queryKey: [QUERY_KEY.BOOKMARKED_PLAYLISTS, userId],
    queryFn: () => fetchBookmarkedPlaylists(userId),
    enabled: !!userId, // userId가 없으면 쿼리 실행 안함
    refetchOnWindowFocus: false, // 윈도우 포커스 시 자동 리패치 방지
    retry: false, // 실패 시 재시도 방지
    staleTime: CACHE_STALE_TIME, // 캐시가 오래된 데이터는 10분 후 갱신
  });
};
