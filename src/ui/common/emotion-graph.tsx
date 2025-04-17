"use client";

import { EMOTIONS_QUERY } from "@/constants/emotion.constant";
import { useGetAllPostsByIdQuery } from "@/hooks/queries/use-get-my-posts-query";
import emotionGraphCal from "@/utils/emotion-graph-cal.util";
import { checkEmotion } from "@/utils/home-emotion.util";
import { X } from "lucide-react";
import EmotionImage from "./emotion-image.common";

const EmotionGraph = ({
  page,
  openPopup,
  setOpenPopup,
  userId,
  nickname,
}: {
  page: string;
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
    <div className="flex flex-col items-center justify-center w-full bg-white p-5 font-pretendard rounded-xl">
      {page === "list" && (
        <div className="flex justify-between items-center w-full border-grey-1 border-b-2 pb-4 mb-1">
          <div className="text-xl font-bold">{nickname}</div>
          <X className="cursor-pointer" onClick={setOpenPopup} />
        </div>
      )}
      <div className="text-xs w-full text-right mb-2 text-grey-2 mt-2">
        * 최근 3개월 통계
      </div>
      <div className="flex items-end justify-end text-xs gap-2">
        {emotions.map((e, i) => {
          const percentageValue = parseFloat(e.percentage.replace("%", ""));
          const barHeight = Math.max(
            (percentageValue / maxPercentage) * 150,
            4,
          );

          return (
            <div
              key={i}
              className="flex flex-col items-center justify-end text-xs gap-2"
            >
              <div
                className="w-4 border rounded-t-lg px-7"
                style={{
                  height: `${barHeight}px`,
                  backgroundColor: `var(--color-${color[e.emotion]})`,
                }}
              ></div>
              <EmotionImage src={checkEmotion(e.emotion)} size="s" />
              <div className="mt-1">{EMOTIONS_QUERY[e.emotion]}</div>
              <div className="mt-1">{Math.floor(parseInt(e.percentage))}%</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EmotionGraph;
