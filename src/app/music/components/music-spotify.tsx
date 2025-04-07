"use client";

import { useEffect, useState } from "react";
import { PlaylistItem } from "../type";
import { getAccessToken, getEmotionPlaylists } from "./music-api";
import { Emotion } from "@/constants/spotify";
import Image from "next/image";

const MusicSpotify = () => {
  const [playlists, setPlaylists] = useState<PlaylistItem[]>([]);
  const emotion: Emotion = Emotion.SAD;

  useEffect(() => {
    const fetchPlaylists = async () => {
      const accessToken = await getAccessToken();

      if (!accessToken) return;

      const playlistData = await getEmotionPlaylists(emotion, accessToken);

      // playlistData가 배열인 경우에만 상태 업데이트
      if (Array.isArray(playlistData)) {
        setPlaylists(playlistData);
      }
    };

    fetchPlaylists();
  }, [emotion]);

  return (
    <div>
      <h2>감정 기반 추천 플레이리스트 ({emotion})</h2>
      <ul>
        {playlists.map((item) => {
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
