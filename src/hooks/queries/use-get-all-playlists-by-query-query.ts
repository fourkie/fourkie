"use client";

import { QUERY_KEY } from "@/constants/query-keys.constant";
import { Emotion } from "@/constants/spotify.constant";
import { fetchEmotionBasedPlaylists } from "@/services/music-service";
import { useQuery } from "@tanstack/react-query";

export const useGetAllPlaylistsByQueryQuery = (emotion: Emotion) => {
  return useQuery({
    queryKey: [QUERY_KEY.EMOTION_PLAYLISTS, emotion],
    queryFn: () => fetchEmotionBasedPlaylists(emotion),
    staleTime: 1000 * 60 * 30, // 30분 동안 캐시 유지
    retry: 2, // 최대 2번 재시도
  });
};
