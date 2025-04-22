import { EMOTIONS_QUERY } from "@/constants/emotion.constant";
import { Emotion } from "@/constants/spotify.constant";
import { EmotionSelectProps } from "../type";

const EmotionSelect = ({
  emotion,
  onChange,
  todayEmotion,
}: EmotionSelectProps) => {
  return (
    <div className="absolute left-2/1 pl-6 top-16">
      <div className="mb-2 flex items-center gap-3">
        <select
          value={emotion}
          onChange={(e) => onChange(e.target.value as Emotion)}
          className="h-7 w-26 rounded-full border-b border-b-primary-300 bg-primary-100 px-2 py-1 text-center text-sm font-bold text-primary-700"
        >
          {Object.entries(EMOTIONS_QUERY).map(([emotionKey]) => {
            return (
              <option key={emotionKey} value={emotionKey}>
                {EMOTIONS_QUERY[emotionKey]} 날
              </option>
            );
          })}
        </select>
        <p className="text-xl font-bold text-white">듣기 좋은</p>
      </div>
      <p className="text-xl font-bold text-white">
        플레이리스트를 추천해 드릴게요!
      </p>
      <p className="mt-6 text-xs text-grey-2">
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
