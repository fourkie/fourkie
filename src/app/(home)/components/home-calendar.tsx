"use client";

import { QUERYDATA } from "@/constants/query-data.constant";
import { useGetUserPostByMonthQuery } from "@/hooks/queries/use-get-user-posts-by-month-query";
import EmotionImage from "@/ui/common/emotion-image.common";
import { checkEmotion } from "@/utils/home-emotion.util";
import dayjs from "dayjs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import HomeDate from "./home-date";

const HomeCalendar = ({ userId }: { userId: string | undefined }) => {
  const [currentDate, setCurrentDate] = useState(dayjs());

  const startOfMonth = currentDate.startOf("month");
  const startDay = startOfMonth.day();
  const daysInMonth = currentDate.daysInMonth();

  const nextMonth = currentDate.add(1, "month");
  const isNextMonthFuture = nextMonth.isAfter(dayjs(), "month");

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
      <div className="mx-auto my-5 flex min-h-[25rem] w-full max-w-md items-center justify-center rounded-xl border border-secondary-100 p-5 shadow-[0_0_6px_0_rgba(0,0,0,0.10)]">
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
    <div className="mx-auto my-5 w-full max-w-md rounded-xl border border-secondary-100 p-5 shadow-[0_0_6px_0_rgba(0,0,0,0.10)]">
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
      <Link href={"/list"}>
        <div className="grid grid-cols-7 gap-2">
          {["S", "M", "T", "W", "T", "F", "S"].map((d, index) =>
            d === "S" ? (
              index === 0 ? (
                <div
                  key={index}
                  className="text-center font-semibold text-secondary-200"
                >
                  {d}
                </div>
              ) : (
                <div
                  key={index}
                  className="text-center font-semibold text-primary-200"
                >
                  {d}
                </div>
              )
            ) : (
              <div key={index} className="text-center font-semibold">
                {d}
              </div>
            ),
          )}

          {days.map((day, idx) => {
            //미래면 true 아니면 false
            const isFuture =
              //day가 null이 아닌 경우에만 동작
              day &&
              //dayjs 형식(YYYY-M-D)으로 만들고 isAfter로 비교하기 미래 > true
              dayjs(
                `${currentDate.year()}-${currentDate.month() + 1}-${day}`,
                "YYYY-M-D",
              ).isAfter(dayjs(), "day");

            return (
              <div
                key={idx}
                className={`relative flex h-[3rem] items-center justify-center rounded-lg ${
                  isFuture ? "text-grey-3" : ""
                }`}
              >
                {day && (
                  <>
                    {images[day] ? (
                      <EmotionImage
                        src={checkEmotion(images[day])}
                        size={"xxs"}
                      />
                    ) : (
                      <span>{day}</span>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </Link>
    </div>
  );
};

export default HomeCalendar;
