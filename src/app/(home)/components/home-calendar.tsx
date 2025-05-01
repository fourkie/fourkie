"use client";

import { QUERYDATA } from "@/constants/query-data.constant";
import { useGetUserPostByMonthQuery } from "@/hooks/queries/use-get-user-posts-by-month-query";
import { usePostStore } from "@/hooks/zustand/post-date-store";
import EmotionImage from "@/ui/common/emotion-image.common";
import { checkEmotion } from "@/utils/home-emotion.util";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import HomeDate from "./home-date";

const changeStyle =
  "md:max-w-2xl max-h-[366px] md:rounded-[28px] min-w-[250px] min-h-[300px] max-w-[353px] md:min-h-[500px] md:max-h-[700px] lg:max-w-[620px] lg:max-h-[720px] md:border-primary-200 md:border-2 md:border-dashed md:bg-[#F7FAF2] ";

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
        className={`mx-auto flex items-center justify-center rounded-[20px] border border-secondary-100 shadow-[0_0_6px_0_rgba(0,0,0,0.10)] ${changeStyle}`}
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
      role="region"
      aria-label="감정 캘린더"
      className={`mx-auto rounded-[20px] border border-secondary-100 px-1 py-2 shadow-[0_0_6px_0_rgba(0,0,0,0.10)] ${changeStyle}`}
    >
      <div className="flex items-center justify-between px-3 lg:px-5">
        <ChevronLeft
          onClick={handlePrevMonth}
          className="cursor-pointer text-grey-7 transition-all duration-300 ease-in-out hover:scale-110 hover:text-grey-5 md:h-8 md:w-8"
          role="button"
          aria-label="이전 달 보기"
        />
        <div className="flex flex-1 justify-center overflow-hidden pb-1 md:justify-center">
          <HomeDate currentDate={currentDate} setCurrentDate={setCurrentDate} />
        </div>
        <ChevronRight
          role="button"
          aria-label="다음 달 보기"
          onClick={() => {
            if (!isNextMonthFuture) handleNextMonth();
          }}
          className={` ${
            isNextMonthFuture
              ? "cursor-not-allowed text-grey-2 md:h-8 md:w-8"
              : "cursor-pointer text-grey-7 transition-all duration-300 ease-in-out hover:scale-110 hover:text-grey-5 md:h-8 md:w-8"
          }`}
        />
      </div>

      <motion.div
        className="grid grid-cols-7 gap-2"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.05,
            },
          },
        }}
      >
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
              aria-label="날짜"
              key={idx}
              className={`relative flex h-[2.3rem] items-center justify-center rounded-md md:h-[5rem] lg:h-[5.8rem] ${
                isFuture || day === null
                  ? "text-grey-2"
                  : "cursor-pointer transition-all duration-200 ease-in-out hover:bg-secondary-50 md:hover:bg-[#F7FAF2]"
              }`}
            >
              {day && (
                <>
                  {images[day] ? (
                    <motion.div
                      onClick={handleClick}
                      variants={{
                        hidden: { opacity: 0, scale: 0.8 },
                        visible: { opacity: 1, scale: 1 },
                      }}
                      transition={{
                        duration: 0.4,
                        delay: Math.random() * 0.4,
                      }}
                    >
                      <EmotionImage
                        src={checkEmotion(images[day])}
                        size="xxs"
                        className="transition-transform duration-300 ease-in-out hover:scale-110"
                      />
                    </motion.div>
                  ) : (
                    <span
                      className={`md:text-lg lg:text-[26px] lg:font-bold ${
                        isFuture
                          ? ""
                          : idx % 7 === 6
                            ? "text-primary-500"
                            : idx % 7 === 0
                              ? "text-secondary-400"
                              : ""
                      }`}
                    >
                      {day}
                    </span>
                  )}
                </>
              )}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default HomeCalendar;
