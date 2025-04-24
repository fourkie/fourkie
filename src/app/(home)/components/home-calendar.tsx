"use client";

import { QUERYDATA } from "@/constants/query-data.constant";
import { useGetUserPostByMonthQuery } from "@/hooks/queries/use-get-user-posts-by-month-query";
import { usePostStore } from "@/hooks/zustand/post-date-store";
import EmotionImage from "@/ui/common/emotion-image.common";
import { checkEmotion } from "@/utils/home-emotion.util";
import dayjs from "dayjs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import HomeDate from "./home-date";

const changeStyle =
  "lg:max-w-2xl xl:max-w-4xl lg:border-primary-200 lg:border-2 lg:border-dashed lg:bg-[#F7FAF2]";

const HomeCalendar = ({ userId }: { userId: string | undefined }) => {
  const [currentDate, setCurrentDate] = useState(dayjs());

  const startOfMonth = currentDate.startOf("month");
  const startDay = startOfMonth.day();
  const daysInMonth = currentDate.daysInMonth();

  const nextMonth = currentDate.add(1, "month");
  const isNextMonthFuture = nextMonth.isAfter(dayjs(), "month");

  const route = useRouter();
  const setSelectedDate = usePostStore((state) => state.setSelectedDate);

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
      <div
        className={`mx-auto flex min-h-[25rem] w-full max-w-md items-center justify-center rounded-xl border border-secondary-100 p-5 shadow-[0_0_6px_0_rgba(0,0,0,0.10)] ${changeStyle}`}
      >
        <span className="text-lg text-grey-3">
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
    setCurrentDate(nextMonth);
  };

  const days = [];
  for (let i = 0; i < startDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  return (
    <div
      className={`mx-auto rounded-xl border border-secondary-100 p-5 shadow-[0_0_6px_0_rgba(0,0,0,0.10)] ${changeStyle}`}
    >
      <div className="flex items-center justify-between">
        <ChevronLeft onClick={handlePrevMonth} className="cursor-pointer" />
        <HomeDate currentDate={currentDate} setCurrentDate={setCurrentDate} />
        <ChevronRight
          onClick={() => {
            if (!isNextMonthFuture) handleNextMonth();
          }}
          className={` ${
            isNextMonthFuture
              ? "cursor-not-allowed text-grey-2"
              : "hover:text-primary cursor-pointer transition"
          }`}
        />
      </div>

      <div className="grid grid-cols-7 gap-2">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, index) =>
          d === "S" ? (
            index === 0 ? (
              <div
                key={index}
                className="text-center font-semibold text-secondary-200 lg:text-lg xl:text-xl"
              >
                {d}
              </div>
            ) : (
              <div
                key={index}
                className="text-center font-semibold text-primary-200 lg:text-lg xl:text-xl"
              >
                {d}
              </div>
            )
          ) : (
            <div
              key={index}
              className="text-center font-semibold lg:text-lg xl:text-xl"
            >
              {d}
            </div>
          ),
        )}

        {days.map((day, idx) => {
          const isFuture =
            day &&
            dayjs(
              `${currentDate.year()}-${currentDate.month() + 1}-${day}`,
              "YYYY-M-D",
            ).isAfter(dayjs(), "day");

          const handleClick = () => {
            if (!day || isFuture) return;
            const formattedDate = dayjs(
              `${currentDate.year()}-${currentDate.month() + 1}-${day}`,
              "YYYY-M-D",
            ).format("YYYY-MM-DD");

            setSelectedDate(formattedDate);
            route.push("/list");
          };

          return (
            <div
              key={idx}
              className={`relative flex h-[3rem] items-center justify-center rounded-lg lg:h-[6rem] xl:h-[7.5rem] ${
                isFuture || day === null
                  ? "text-grey-3"
                  : "cursor-pointer transition-all duration-200 ease-in-out hover:bg-secondary-50 lg:hover:bg-[#F7FAF2]"
              }`}
            >
              {day && (
                <>
                  {images[day] ? (
                    <div onClick={handleClick}>
                      <EmotionImage
                        src={checkEmotion(images[day])}
                        size={"xxs"}
                      />
                    </div>
                  ) : (
                    <span className="lg:text-lg xl:text-xl">{day}</span>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomeCalendar;
