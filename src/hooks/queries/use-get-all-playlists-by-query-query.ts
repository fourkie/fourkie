"use client";

import { QUERY_KEY } from "@/constants/query-keys.constant";
import { Emotion } from "@/constants/spotify.constant";
import {
  getEmotionPlaylists,
  getSpotifyAccessToken,
} from "@/services/music-service";
import { useQuery } from "@tanstack/react-query";

export const useGetAllPlaylistsByQueryQuery = (emotion: Emotion) => {
  return useQuery({
    queryKey: [QUERY_KEY.EMOTION_PLAYLISTS, emotion],
    queryFn: async () => {
      const accessToken = await getSpotifyAccessToken();

      if (!accessToken) {
        throw new Error("AccessToken을 가져오지 못했습니다.");
      }

      return await getEmotionPlaylists(emotion, accessToken);
    },
    staleTime: 1000 * 60 * 30, // 30분 동안 fresh
  });
};
