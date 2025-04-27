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
  "md:max-w-2xl md:max-h-[700px] lg:max-w-[620px] lg:max-h-[702px] md:border-primary-200 md:border-2 md:border-dashed md:bg-[#F7FAF2] ";

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

  if (isPending || isError)
    return (
      <div
        className={`mx-auto flex min-h-[25rem] w-full max-w-md items-center justify-center rounded-[20px] border border-secondary-100 shadow-[0_0_6px_0_rgba(0,0,0,0.10)] ${changeStyle}`}
      >
        <span className="text-md text-grey-3">
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
      className={`mx-auto max-h-[366px] min-w-[250px] max-w-[353px] rounded-[20px] border border-secondary-100 px-1 py-2 shadow-[0_0_6px_0_rgba(0,0,0,0.10)] ${changeStyle}`}
    >
      <div className="flex items-center justify-between px-3 lg:px-5">
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
                className="md:text-md text-center font-semibold text-secondary-200 lg:text-[28px]"
              >
                {d}
              </div>
            ) : (
              <div
                key={index}
                className="md:text-md text-center font-semibold text-primary-200 lg:text-[28px]"
              >
                {d}
              </div>
            )
          ) : (
            <div
              key={index}
              className="md:text-md text-center font-semibold lg:text-[28px]"
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
              className={`relative flex h-[2.7rem] items-center justify-center rounded-md md:h-[5rem] lg:h-[6.5rem] ${
                isFuture || day === null
                  ? "text-grey-3"
                  : "cursor-pointer transition-all duration-200 ease-in-out hover:bg-secondary-50 md:hover:bg-[#F7FAF2]"
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
                    //이미지 없는 와중에 토요일이나 일요일
                    <span className="md:text-lg lg:text-[26px] lg:font-bold">
                      {day}
                    </span>
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
