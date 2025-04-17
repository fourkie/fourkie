import { Emotion, EMOTION_DISPLAY_NAME } from "@/constants/spotify.constant";
import { EmotionSelectProps } from "../type";

const EmotionSelect = ({ value, onChange }: EmotionSelectProps) => {
  return (
    <div className="absolute left-5 top-16">
      <div className="mb-2 flex items-center gap-3">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as Emotion)}
          className="h-8 w-20 rounded-full border-[1px] bg-[#D5E5BD] pl-2 text-center py-1 text-sm font-bold"
        >
          {Object.entries(EMOTION_DISPLAY_NAME).map(
            ([emotionKey, emotionDisplayName]) => (
              <option key={emotionKey} value={emotionKey}>
                {emotionDisplayName}
              </option>
            ),
          )}
        </select>
        <p className="font-bold text-lg text-white">듣기 좋은</p>
      </div>
      <p className="font-bold text-lg text-white">플레이리스트를 추천해 드릴게요!</p>
    </div>
  );
};

export default EmotionSelect;
