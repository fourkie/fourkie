import { Emotion } from "@/constants/spotify.constant";
import EmotionBasedPlaylists from "./components/emotion-based-playlists";

const Music = async () => {
  return (
    <div>
      <EmotionBasedPlaylists emotion={Emotion.SAD} />
    </div>
  );
};

export default Music;
