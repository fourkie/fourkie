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

  const whiteText = emotion === "SAD" || emotion === "ANGRY";
  const emotionKeys = Object.keys(EMOTIONS_QUERY) as (keyof typeof Emotion)[];

  return (
    <div className="absolute left-5 top-14">
      <div className="mb-3 flex items-center gap-2">
        {/* 드롭다운 버튼 */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          className={`flex h-[30px] max-w-72 items-center justify-center gap-1 px-2 py-1 text-center text-sm font-bold ${
            whiteText ? "text-white" : "text-primary-700"
          } ${open ? "rounded-tl-[12px] rounded-tr-[12px]" : "rounded-xl"}`}
          style={{
            backgroundColor: `var(--color-${EMOTION_COLOR[emotion]})`,
          }}
        >
          {EMOTIONS_QUERY[emotion]} 날
          {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {/* 드롭다운 목록 */}
        {open && (
          <div className="absolute top-[30px] grid max-w-72 grid-cols-3 gap-4 rounded-bl-[12px] rounded-br-[12px] rounded-tr-[12px] bg-[#ECF3E2E5] p-4">
            {emotionKeys.map((key) => {
              if (emotion === key) return null;
              const isWhiteOption = key === "SAD" || key === "ANGRY";

              return (
                <button
                  key={key}
                  onClick={() => handleSelect(key)}
                  className={`rounded-full border px-2 py-1 text-sm font-bold ${
                    isWhiteOption ? "text-white" : "text-primary-700"
                  }`}
                  style={{
                    backgroundColor: `var(--color-${EMOTION_COLOR[key]})`,
                    borderColor: `var(--color-${EMOTION_BORDER_COLOR[key]})`,
                  }}
                >
                  {EMOTIONS_QUERY[key]}
                </button>
              );
            })}
          </div>
        )}

        <p className="text-2xl font-bold text-white">듣기 좋은</p>
      </div>
      <p className="text-2xl font-bold text-white">
        플레이리스트를 추천해 드릴게요!
      </p>
      <p className="mt-6 text-grey-2">
        {!todayEmotion && (
          <span>
            오늘의 일기를 작성하면,
            <br />
            감정에 어울리는 음악을 추천해드려요.
          </span>
        )}
      </p>
    </div>
  );
};

export default EmotionSelect;
