import { QUERY_KEY } from "@/constants/query-keys.constant";
import { TOAST_MESSAGE } from "@/constants/toast-message.constant";
import {
  fetchAccessToken,
  fetchSpotifyPlaylistList,
} from "@/services/music-service";
import { useQuery } from "@tanstack/react-query";

export const useGetAllPlaylistsByQueryQuery = (query: string) => {
  // 토큰과 플레이리스트 요청을 하나의 useQuery 훅으로 처리
  const {
    data: playlistsData,
    error: playlistsError,
    isPending: playlistsPending,
  } = useQuery({
    queryKey: [QUERY_KEY.SPOTIFY_PLAYLISTS, query],
    queryFn: async () => {
      // 토큰 요청
      const tokenData = await fetchAccessToken();
      const accessToken: string = tokenData?.accessToken;

      if (!accessToken) {
        throw new Error(TOAST_MESSAGE.SPOTIFY.ACCESS_TOKEN_ERROR);
      }

      // 받은 토큰으로 플레이리스트 요청
      return fetchSpotifyPlaylistList(accessToken, query);
    },
    enabled: !!query,
  });

  return {
    playlists: playlistsData || [], // 기본값으로 빈 배열 반환
    playlistsError,
    playlistsPending,
  };
};
