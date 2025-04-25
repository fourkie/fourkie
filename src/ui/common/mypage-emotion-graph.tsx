"use client";

import { EMOTIONS_QUERY } from "@/constants/emotion.constant";
import { useGetAllPostsByIdQuery } from "@/hooks/queries/use-get-my-posts-query";
import emotionGraphCal from "@/utils/emotion-graph-cal.util";
import { checkEmotion } from "@/utils/home-emotion.util";
import EmotionImage from "./emotion-image.common";

const MypageEmotionGraph = ({ userId }: { userId: string }) => {
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

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-primary-50 p-3">
      <div className="text-right text-md text-grey-3">* 최근 3개월 통계</div>
      <div className="flex items-end justify-between">
        {emotions.map((e, i) => {
          const percentageValue = parseFloat(e.percentage.replace("%", ""));
          const barHeight = Math.max(
            (percentageValue / maxPercentage) * 150,
            4,
          );

          return (
            <div
              key={i}
              className="flex flex-col items-center justify-end gap-3 text-xs md:h-56"
            >
              <div
                className="w-4 rounded-t-lg border px-7"
                style={{
                  height: `${barHeight}px`,
                  backgroundColor: `var(--color-${color[e.emotion]})`,
                }}
              ></div>
              <EmotionImage src={checkEmotion(e.emotion)} size="s" />
              <div>{EMOTIONS_QUERY[e.emotion]}</div>
              <div>{Math.floor(Number(percentageValue))}%</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MypageEmotionGraph;
