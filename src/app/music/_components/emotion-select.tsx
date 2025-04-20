import { Emotion, EMOTION_DISPLAY_NAME } from "@/constants/spotify.constant";
import { EmotionSelectProps } from "../type";

const EmotionSelect = ({
  value,
  onChange,
  todayEmotion,
}: EmotionSelectProps) => {
  return (
    <div className="absolute left-5 top-16">
      <div className="mb-2 flex items-center gap-3">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as Emotion)}
          className="h-8 w-20 rounded-full border-[1px] bg-[#D5E5BD] py-1 pl-2 text-center text-sm font-bold"
        >
          {Object.entries(EMOTION_DISPLAY_NAME).map(
            ([emotionKey, emotionDisplayName]) => (
              <option key={emotionKey} value={emotionKey}>
                {emotionDisplayName}
              </option>
            ),
          )}
        </select>
        <p className="text-lg font-bold text-white">듣기 좋은</p>
      </div>
      <p className="text-lg font-bold text-white">
        플레이리스트를 추천해 드릴게요!
      </p>
      <p className="mt-6 text-sm text-white">
        {!todayEmotion && (
          <span>
            일기를 작성하고
            <br />
            오늘 감정에 맞는 플레이리스트를 추천받아보세요.
          </span>
        )}
      </p>
    </div>
  );
};

export default EmotionSelect;
