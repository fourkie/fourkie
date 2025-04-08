"use client";

import { useState } from "react";
import dayjs from "dayjs";
import { CommonEmotionImage } from "@/_components/common-emotion-image";
import { checkEmotion } from "@/utils/home-emotion.util";
import { useRouter } from "next/navigation";
import HomeDate from "./home-date";
import { useGetUserPostByMonthQuery } from "@/hooks/queries/use-get-user-posts-by-month-query";

const HomeCalendar = ({ userId }: { userId: string | undefined }) => {
  const route = useRouter();

  //달력에 표시된 날 바꾸기 위해 state로 관리 하위 컴포넌트로 전달해줄거임
  const [currentDate, setCurrentDate] = useState(dayjs());

  const startOfMonth = currentDate.startOf("month");
  const startDay = startOfMonth.day();
  const daysInMonth = currentDate.daysInMonth();

  //쿼리사용
  const {
    data: posts,
    isPending,
    isError,
  } = useGetUserPostByMonthQuery(
    userId,
    currentDate.year(),
    currentDate.month() + 1,
  );

  if (isPending) return <div>데이터 불러오는 중</div>;
  if (isError) return <div>에러 발생!</div>;

  if (!posts) {
    route.push("/sign-in");
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
    // nextMonth가 오늘보다 '이후 달'이면 막기
    //isAfter()는 날짜가 이후인지를 판별하는 Day.js 비교 함수
    //이후면 true 나옴 . 앞에 있는 애가 비교 대상 ()안에 있는 애가 비교 기준
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
        {["S", "M", "T", "W", "T", "F", "S"].map((d) =>
          d === "S" ? (
            <div key={d} className="text-center font-semibold text-green-500">
              {d}
            </div>
          ) : (
            <div key={d} className="text-center font-semibold">
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
