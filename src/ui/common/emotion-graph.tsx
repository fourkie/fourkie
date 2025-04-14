"use client";

import { useGetAllPostsByIdQuery } from "@/hooks/queries/use-get-my-posts-query";
import Popup from "./popup";
import emotionGraphCal from "@/utils/emotion-graph-cal.util";

const EmotionGraph = ({
  openPopup,
  setOpenPopup,
  userId,
}: {
  openPopup: boolean;
  setOpenPopup: () => void;
  userId: string;
}) => {
  const { data: posts } = useGetAllPostsByIdQuery({ userId });
  if (!posts) return null;

  const calculatedEmotion = emotionGraphCal(posts);
  const emotions = calculatedEmotion.emotions;
  const numericPercentages = emotions.map((e) =>
    parseFloat(e.percentage.replace("%", "")),
  );
  const maxPercentage = Math.max(...numericPercentages);

  console.log(calculatedEmotion);

  if (!openPopup) return null;

  return (
    <Popup>
      <div className="flex flex-col items-center justify-center w-full h-full bg-white">
        <div>감정통계팝업</div>
        <div className="cursor-pointer" onClick={setOpenPopup}>
          X
        </div>
        <div className="flex gap-4 items-end h-[70px]">
          {emotions.map((e, i) => {
            const percentageValue = parseFloat(e.percentage.replace("%", ""));
            const barHeight = (percentageValue / maxPercentage) * 150;
            console.log(barHeight);

            return (
              <div key={i} className="flex flex-col items-center justify-end text-xs">
                <div
                  className="w-4 bg-black"
                  style={{ height: `${barHeight}px` }}
                >d</div>
                <div className="mt-1">{e.emotion}</div>
              </div>
            );
          })}
        </div>
      </div>
    </Popup>
  );
};

export default EmotionGraph;
