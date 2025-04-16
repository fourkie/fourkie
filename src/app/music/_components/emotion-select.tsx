import { Emotion, EMOTION_DISPLAY_NAME } from "@/constants/spotify.constant";
import { EmotionSelectProps } from "../type";

const EmotionSelect = ({ value, onChange }: EmotionSelectProps) => {
  return (
    <div className="absolute left-[20px] top-[64px]">
      <div className="mb-2 flex items-center gap-3">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as Emotion)}
          className="h-[24px] w-[81px] gap-[3px] rounded-[12px] border-[1px] border-[#A6C874] bg-[#D5E5BD] px-[8px] py-[3px] text-[14px]"
        >
          {Object.entries(EMOTION_DISPLAY_NAME).map(
            ([emotionKey, emotionDisplayName]) => (
              <option key={emotionKey} value={emotionKey}>
                {emotionDisplayName}
              </option>
            ),
          )}
        </select>
        <p className="font-bold text-white">듣기 좋은</p>
      </div>
      <p className="font-bold text-white">플레이리스트를 추천해 드릴게요!</p>
    </div>
  );
};

export default EmotionSelect;
