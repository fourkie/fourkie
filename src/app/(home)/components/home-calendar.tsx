"use client";

import { useState } from "react";
import dayjs from "dayjs";
import { CommonEmotionImage } from "@/_components/common-emotion-image";
import { checkEmotion } from "@/utils/home-emotion.util";
import HomeDate from "./home-date";
import { useGetUserPostByMonthQuery } from "@/hooks/queries/use-get-user-posts-by-month-query";
import { QUERYDATA } from "@/constants/query-data";

const HomeCalendar = ({ userId }: { userId: string | undefined }) => {
  const [currentDate, setCurrentDate] = useState(dayjs());

  const startOfMonth = currentDate.startOf("month");
  const startDay = startOfMonth.day();
  const daysInMonth = currentDate.daysInMonth();

  const {
    data: posts,
    isPending,
    isError,
  } = useGetUserPostByMonthQuery(
    userId,
    currentDate.year(),
    currentDate.month() + 1,
  );

  // 펜딩 or 에러일 때 크기 같게 유지하려고 min-h-500px 줬습니다.
  if (isPending || isError)
    return (
      <div className="w-full max-w-md mx-auto shadow-xl p-5 min-h-[500px] flex items-center justify-center">
        <span className="text-gray-500 text-lg">
          {isPending ? QUERYDATA.ISPENDING : QUERYDATA.ISERROR}
        </span>
      </div>
    );

  if (!posts) {
    return;
  }
  const images: { [key: number]: string } = {};
  posts.forEach((post) => {
    const day = parseInt(post.post_created_at.slice(8, 10));
    images[day] = post.post_emotion;
  });

  const handlePrevMonth = () =>
    setCurrentDate(currentDate.subtract(1, "month"));
  const handleNextMonth = () => {
    const nextMonth = currentDate.add(1, "month");
    if (nextMonth.isAfter(dayjs(), "month")) return;
    setCurrentDate(nextMonth);
  };

  const days = [];
  for (let i = 0; i < startDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  return (
    <div className="w-full max-w-md mx-auto shadow-xl p-5">
      <div className="flex justify-between items-center mb-4 ">
        <button onClick={handlePrevMonth}>◀</button>
        <HomeDate currentDate={currentDate} setCurrentDate={setCurrentDate} />
        <button onClick={handleNextMonth}>▶</button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, index) =>
          d === "S" ? (
            <div
              key={index}
              className="text-center font-semibold text-green-500"
            >
              {d}
            </div>
          ) : (
            <div key={index} className="text-center font-semibold">
              {d}
            </div>
          ),
        )}

        {days.map((day, idx) => (
          <div
            key={idx}
            className="h-16 rounded-lg relative flex justify-center items-center"
          >
            {day && (
              <>
                {images[day] ? (
                  <CommonEmotionImage
                    src={checkEmotion(images[day])}
                    size={"m"}
                  />
                ) : (
                  <span>{day}</span>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeCalendar;
