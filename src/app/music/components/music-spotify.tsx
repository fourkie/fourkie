"use client";

import { getAccessToken, getTracksByEmotion } from "./music-api";
import { Emotion } from "@/constants/spotify";
import { useEffect, useState } from "react";
import { TrackItem } from "../type";

const MusicSpotify = () => {
  const [tracks, setTracks] = useState<TrackItem[]>([]);
  const emotion: Emotion = Emotion.HAPPY;

  useEffect(() => {
    const fetchTracks = async () => {
      const accessToken = await getAccessToken();

      if (!accessToken) return;

      const result = await getTracksByEmotion(emotion, accessToken);
      setTracks(result);
    };

    fetchTracks();
  }, [emotion]);

  return (
    <div>
      <h2>감정 기반 추천 노래 리스트 ({emotion})</h2>
      <ul>
        {tracks.map((track) => (
          <li key={track.id}>
            <p>
              {track.name} - {track.artists[0]?.name}
            </p>
            <audio controls src={track.preview_url}></audio>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MusicSpotify;
