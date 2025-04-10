import { Emotion } from "@/constants/spotify";
import EmotionBasedPlaylists from "./components/emotion-based-playlists";

const MusicPage = async () => {
  return (
    <div>
      <h1>감정 기반 음악 추천</h1>
      <EmotionBasedPlaylists emotion={Emotion.SAD} />
    </div>
  );
};

export default MusicPage;
