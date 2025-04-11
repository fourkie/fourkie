"use client";

import { Emotion } from "@/constants/spotify.constant";
import EmotionBasedPlaylists from "./components/emotion-based-playlists";

const Music = () => {
  return (
    <div>
      <EmotionBasedPlaylists emotion={Emotion.SAD} />
    </div>
  );
};

export default Music;
