import {
  SpotifyAccessToken,
  SpotifyPlaylistItem,
  SpotifyPlaylistList,
} from "@/app/music/type";
import { QUERY_KEY } from "@/constants/query-keys.constant";
import { SPOTIFY } from "@/constants/spotify.constant";
import { TOAST_MESSAGE } from "@/constants/toast-message.constant";
import { useQuery } from "@tanstack/react-query";

export const useGetAllPlaylistsByQueryQuery = (searchTerm: string) => {
  // ① 토큰 요청
  const fetchAccessToken = async () => {
    const response = await fetch(SPOTIFY.CALLBACK_ROUTE);

    if (!response.ok) {
      throw new Error(TOAST_MESSAGE.SPOTIFY.ACCESS_TOKEN_ERROR);
    }

    const data = response.json();

    return data;
  };

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
    queryKey: [QUERY_KEY.SPOTIFY_PLAYLISTS, searchTerm, accessToken],
    queryFn: async () => {
      if (!accessToken) {
        throw new Error(TOAST_MESSAGE.SPOTIFY.ACCESS_TOKEN_ERROR);
      }

      const apiUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        searchTerm,
      )}&type=playlist&limit=50&offset=0`;

      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok || response.status === 401) {
        throw new Error(TOAST_MESSAGE.SPOTIFY.ERROR);
      }

      const data = await response.json();

      const filteredPlaylists: SpotifyPlaylistList =
        data.playlists.items.filter(
          (item: SpotifyPlaylistItem) => item !== null,
        );

      // null이 아닌 플레이리스트 항목만 필터링
      return filteredPlaylists;
    },
    // 토큰과 검색어가 있을 때만 실행
    enabled: !!accessToken && !!searchTerm,
  });

  return {
    accessToken,
    playlists: playlistsData || [],
    tokenError,
    playlistsError,
    tokenPending,
    playlistsPending,
    refetch, // 플레이리스트 재요청 함수
  };
};
