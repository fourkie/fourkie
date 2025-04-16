import { Emotion, EMOTION_DISPLAY_NAME } from "@/constants/spotify.constant";
import { EmotionSelectProps } from "../type";

const EmotionSelect = ({ value, onChange }: EmotionSelectProps) => {
  return (
    <div>
      <div className="mb-2 flex items-center gap-3">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as Emotion)}
          className="h-[34px] w-[100px] gap-[3px] rounded-[30px] border-[3px] border-[#BED79A] px-[14px] py-[4px]"
        >
          {Object.entries(EMOTION_DISPLAY_NAME).map(
            ([emotionKey, emotionDisplayName]) => (
              <option key={emotionKey} value={emotionKey}>
                {emotionDisplayName}
              </option>
            ),
          )}
        </select>
        <p>듣기 좋은</p>
      </div>
      <p>플레이리스트를 추천해 드릴게요!</p>
    </div>
  );
};

export default EmotionSelect;
