import { SpotifyAccessToken } from "@/app/music/type";
import { QUERY_KEY } from "@/constants/query-keys.constant";
import {
  fetchAccessToken,
  fetchSpotifyPlaylistList,
} from "@/services/music-service";
import { useQuery } from "@tanstack/react-query";

export const useGetAllPlaylistsByQueryQuery = (query: string) => {
  // ① 토큰 요청
  const {
    data: tokenData,
    error: tokenError,
    isPending: tokenPending,
    refetch: refetchToken,
  } = useQuery({
    queryKey: [QUERY_KEY.SPOTIFY_ACCESS_TOKEN],
    queryFn: fetchAccessToken,
  });

  const accessToken: SpotifyAccessToken = tokenData?.accessToken;

  // ② 토큰이 없으면 새로 발급 요청
  if (!accessToken) {
    refetchToken();
  }

  // ③ 토큰이 있을 때만 플레이리스트 데이터 요청
  const {
    data: playlistsData,
    error: playlistsError,
    isPending: playlistsPending,
    refetch,
  } = useQuery({
    queryKey: [QUERY_KEY.SPOTIFY_PLAYLISTS, query, accessToken],
    queryFn: () => fetchSpotifyPlaylistList(accessToken, query),
    // 토큰과 검색어가 있을 때만 실행
    enabled: !!accessToken && !!query,
  });

  return {
    accessToken,
    playlists: playlistsData || [],
    tokenError,
    playlistsError,
    tokenPending,
    playlistsPending,
    refetch,
  };
};
