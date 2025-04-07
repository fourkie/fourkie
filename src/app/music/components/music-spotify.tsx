"use client";

import { useQuery } from "@tanstack/react-query";
import { PlaylistItem } from "../type";
import { Emotion } from "@/constants/spotify";
import Image from "next/image";
import {
  getSpotifyAccessToken,
  getEmotionPlaylists,
} from "@/services/music-services";

const MusicSpotify = () => {
  const emotion: Emotion = Emotion.SAD;

  const {
    data: playlists = [],
    isLoading,
    isError,
  } = useQuery<PlaylistItem[], Error>({
    queryKey: ["emotionPlaylists", emotion],
    queryFn: async () => {
      const accessToken = await getSpotifyAccessToken();

      if (!accessToken) {
        throw new Error("AccessToken을 가져오지 못했습니다.");
      }

      return await getEmotionPlaylists(emotion, accessToken);
    },
    staleTime: 1000 * 60 * 30, // 30분 동안 fresh
  });

  if (isLoading) return <p>로딩 중...</p>;
  if (isError) return <p>에러 발생!</p>;

  return (
    <div>
      <h2>감정 기반 추천 플레이리스트 ({emotion})</h2>
      <ul>
        {playlists?.map((item) => {
          if (!item || !item.id || !item.name) return null;

          return (
            <li key={item.id}>
              <p>{item.name}</p>
              {item.images?.[0]?.url && (
                <Image
                  src={item.images[0].url}
                  alt={`Playlist cover: ${item.name}`}
                  width={200}
                  height={200}
                  style={{ borderRadius: "12px", margin: "10px 0" }}
                />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MusicSpotify;
