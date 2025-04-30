import { QUERY_KEY } from "@/constants/query-keys.constant";
import { TOAST_MESSAGE } from "@/constants/toast-message.constant";
import {
  fetchAccessToken,
  fetchSpotifyPlaylistList,
} from "@/services/music-service";
import { useQuery } from "@tanstack/react-query";

export const useGetAllPlaylistsByQueryQuery = (emotionQuery: string) => {
  const { data, error, isPending } = useQuery({
    queryKey: [QUERY_KEY.SPOTIFY_PLAYLISTS, emotionQuery],
    queryFn: async () => {
      const tokenData = await fetchAccessToken();
      const accessToken: string = tokenData?.accessToken;

      if (!accessToken) {
        throw new Error(TOAST_MESSAGE.SPOTIFY.ACCESS_TOKEN_ERROR);
      }

      return fetchSpotifyPlaylistList(accessToken, emotionQuery);
    },
    enabled: !!emotionQuery,
  });

  return {
    playlists: data || [],
    error,
    isPending,
  };
};
