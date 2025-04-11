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

  console.log(calculatedEmotion);

  if (!openPopup) return null;

  return (
    <Popup>
      <div className="flex flex-col items-center justify-center w-full h-full bg-white">
        <div>감정통계팝업</div>
        <div className="cursor-pointer" onClick={setOpenPopup}>
          X
        </div>
      </div>
    </Popup>
  );
};

export default EmotionGraph;
