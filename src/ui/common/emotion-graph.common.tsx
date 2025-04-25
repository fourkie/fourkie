"use client";

import { EMOTIONS_QUERY } from "@/constants/emotion.constant";
import EMOTION_COOKIE_IMAGE_URL from "@/constants/emotions-url.constant";
import { useGetAllPostsByIdQuery } from "@/hooks/queries/use-get-my-posts-query";
import emotionGraphCal from "@/utils/emotion-graph-cal.util";
import { checkEmotion } from "@/utils/home-emotion.util";
import { X } from "lucide-react";
import EmotionImage from "./emotion-image.common";

const EmotionGraph = ({
  isListPage,
  openPopup,
  setOpenPopup,
  userId,
  nickname,
}: {
  isListPage: boolean;
  openPopup?: boolean;
  setOpenPopup?: () => void;
  userId: string;
  nickname: string;
}) => {
  const { data: posts } = useGetAllPostsByIdQuery({ userId });
  if (!posts) return null;

  const calculatedEmotion = emotionGraphCal(posts);
  const emotions = calculatedEmotion.emotions;
  const numericPercentages = emotions.map((e) =>
    parseFloat(e.percentage.replace("%", "")),
  );
  const maxPercentage = Math.max(...numericPercentages);

  const color: Record<string, string> = {
    JOY: "primary-400",
    EXCITED: "primary-300",
    BUTTERFLY: "primary-200",
    GRATEFUL: "primary-100",
    CALM: "primary-50",
    LONELY: "secondary-50",
    ANXIOUS: "secondary-100",
    TIRED: "secondary-200",
    SAD: "secondary-300",
    ANGRY: "secondary-400",
  };

  if (!openPopup) return null;

  return (
    <div className="flex w-full max-w-[548px] flex-col items-center justify-center rounded-xl bg-white p-5 font-pretendard">
      {isListPage && (
        <div className="mb-1 flex w-full items-center justify-between border-b-2 border-grey-1 pb-2">
          <div className="flex items-center gap-3">
            <strong className="text-xl">{nickname}</strong>
            <EmotionImage src={EMOTION_COOKIE_IMAGE_URL.EXCITED} size="xs" />
          </div>
          <X className="cursor-pointer" onClick={setOpenPopup} />
        </div>
      )}
      <div className="text-md mb-2 mt-2 w-full text-right text-grey-2">
        * 최근 3개월 통계
      </div>
      <div className="flex w-full max-w-[548px] items-end justify-between">
        {emotions.map((e, i) => {
          const percentageValue = parseFloat(e.percentage.replace("%", ""));
          const barHeight = Math.max(
            (percentageValue / maxPercentage) * 150,
            4,
          );

          return (
            <div
              key={i}
              className="flex w-[15%] flex-col items-center justify-end gap-2"
            >
              <div
                className="rounded-t-lg border px-[60%]"
                style={{
                  height: `${barHeight}px`,
                  backgroundColor: `var(--color-${color[e.emotion]})`,
                }}
              ></div>
              <EmotionImage src={checkEmotion(e.emotion)} size="s" />
              <strong className="mt-1">{EMOTIONS_QUERY[e.emotion]}</strong>
              <div className="mt-1">{Math.floor(parseInt(e.percentage))}%</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EmotionGraph;
