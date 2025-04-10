import { QUERY_KEY } from "@/constants/query-keys.constant";
import { Emotion, MS_IN_MINUTE } from "@/constants/spotify.constant";
import { fetchEmotionBasedPlaylists } from "@/services/music-service";
import { useQuery } from "@tanstack/react-query";

export const useGetAllPlaylistsByQueryQuery = (emotion: Emotion) => {
  return useQuery({
    queryKey: [QUERY_KEY.EMOTION_PLAYLISTS, emotion],
    queryFn: () => fetchEmotionBasedPlaylists(emotion),
    staleTime: MS_IN_MINUTE,
    retry: 2,
  });
};
