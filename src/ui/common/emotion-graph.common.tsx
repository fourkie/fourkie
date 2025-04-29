"use client";

import { COOKIE_ALERT } from "@/constants/cookie-alert.constant";
import { EMOTIONS_QUERY } from "@/constants/emotion.constant";
import EMOTION_COOKIE_IMAGE_URL from "@/constants/emotions-url.constant";
import { useGetAllPostsByIdQuery } from "@/hooks/queries/use-get-my-posts-query";
import emotionGraphCal from "@/utils/emotion-graph-cal.util";
import { checkEmotion } from "@/utils/home-emotion.util";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import EmotionImage from "./emotion-image.common";
import EmptyAlert from "./empty-alert.common";

const EmotionGraph = ({
  isListPage,
  openPopup,
  setOpenPopup,
  userId,
  nickname,
}: {
  isListPage: boolean;
  openPopup: boolean;
  setOpenPopup?: () => void;
  userId: string;
  nickname?: string;
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

  const isEmpty = emotions.every((e) => e.percentage === "0%");

  return (
    <div
      className={`flex w-full ${isListPage ? "max-w-[548px]" : ""} flex-col items-center justify-center rounded-2xl bg-white ${isListPage ? "" : "border border-primary-50 px-5 md:px-10"} p-5 font-pretendard`}
    >
      {isListPage && (
        <div className="mb-1 flex w-full items-center justify-between border-b-2 border-grey-1 pb-2">
          <div className="flex items-center gap-3">
            <EmotionImage src={EMOTION_COOKIE_IMAGE_URL.EXCITED} size="xs" />
            <strong className="text-xl">{nickname}</strong>
          </div>
          <X className="cursor-pointer" onClick={setOpenPopup} />
        </div>
      )}
      <div className="mb-2 mt-2 w-full text-right text-xs text-grey-2">
        * 최근 3개월 통계
      </div>
      <div
        className={`flex w-full ${isEmpty ? "items-center justify-center" : "items-end justify-between"}`}
      >
        {isEmpty ? (
          <div className="py-10">
            <EmptyAlert
              isContent={true}
              text={COOKIE_ALERT.COMPONENTS.EMPTY_GRAPH}
            />
          </div>
        ) : (
          emotions.map((e, i) => {
            const percentageValue = parseFloat(e.percentage.replace("%", ""));
            const barHeight = Math.max(
              (percentageValue / maxPercentage) * 120,
              4,
            );

            return (
              <div
                key={i}
                className="flex h-[226px] w-[17%] flex-col items-center justify-end gap-[6px] font-medium"
              >
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${barHeight}px` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="mb-[2px] rounded-t-xl border px-[50%]"
                  style={{
                    backgroundColor: `var(--color-${color[e.emotion]})`,
                  }}
                />

                <EmotionImage src={checkEmotion(e.emotion)} size="s" />
                <div className="text-sm text-grey-6">
                  {EMOTIONS_QUERY[e.emotion]}
                </div>
                <div className="text-xs">
                  {Math.floor(parseInt(e.percentage))}%
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default EmotionGraph;
