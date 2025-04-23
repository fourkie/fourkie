import {
  EMOTION_BORDER_COLOR,
  EMOTION_COLOR,
} from "@/constants/emotion-color.constant";
import { EMOTIONS_QUERY } from "@/constants/emotion.constant";
import { Emotion } from "@/constants/spotify.constant";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { EmotionSelectProps } from "../type";

const EmotionSelect = ({
  emotion,
  onChange,
  todayEmotion,
}: EmotionSelectProps) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (emotion: EmotionSelectProps["emotion"]) => {
    onChange(emotion);
    setOpen(false);
  };

  return (
    <div className="left-2/1 absolute top-10 pl-6">
      <div className="mb-2 flex items-center gap-3">
        {/* 드롭다운 버튼 */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex h-[30px] max-w-72 items-center justify-center gap-1 rounded-full bg-primary-100 px-2 py-1 text-center text-sm font-bold text-primary-700"
          style={{
            backgroundColor: `var(--color-${EMOTION_COLOR[emotion]})`,
            // borderColor: `var(--color-${EMOTION_BORDER_COLOR[emotion]})`,
          }}
        >
          {EMOTIONS_QUERY[emotion]} 날
          {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        <p className="text-xl font-bold text-white">듣기 좋은</p>
      </div>

      {/* 드롭다운 목록 */}
      {open && (
        <div className="fixed grid max-w-72 grid-cols-3 gap-4 rounded-xl bg-primary-100 p-3">
          {Object.entries(EMOTIONS_QUERY).map(([emotionKey, emotionLabel]) => {
            if (emotion === emotionKey) return null;
            const isSelected = emotion === emotionKey;

            return (
              <button
                key={emotionKey}
                onClick={() => handleSelect(emotionKey as keyof typeof Emotion)}
                className={`w-full rounded-full border px-2 py-1 text-sm font-bold ${isSelected ? "text-primary-900 bg-primary-300" : "bg-white text-black hover:bg-gray-100"}`}
                style={{
                  backgroundColor: `var(--color-${EMOTION_COLOR[emotionKey]})`,
                  borderColor: `var(--color-${EMOTION_BORDER_COLOR[emotionKey]})`,
                }}
              >
                {emotionLabel}
              </button>
            );
          })}
        </div>
      )}
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
