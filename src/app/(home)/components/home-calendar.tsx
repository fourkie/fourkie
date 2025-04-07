"use client";

import { useState } from "react";
import dayjs from "dayjs";
import { CommonEmotionImage } from "@/_components/common-emotion-image";
import { checkEmotion } from "@/utils/home-emotion.util";
import HomeDate from "./home-date";

const HomeCalendar = () => {
  //달력에 표시된 날 바꾸기 위해 state로 관리 하위 컴포넌트로 전달해줄거임
  const [currentDate, setCurrentDate] = useState(dayjs());

  //시작 달, 시작 날 기록 끝 날짜는 daysInMonth 함수 사용해서 괜찮을 것 같음.
  //daysInMonth 함수가 뭐냐?
  //dayjs().daysInMonth() 형식으로 사용하는 것으로 현재 날짜가 속한 달의 일수를 알려줌
  //currentDate 가 dayjs()로 초기화 되어있으니 이렇게 사용함.
  const startOfMonth = currentDate.startOf("month");
  //const endOfMonth = currentDate.endOf("month");
  const startDay = startOfMonth.day(); // 요일 시작 (0: 일요일)
  const daysInMonth = currentDate.daysInMonth();

  // 예시 이미지 데이터

  const images: { [key: number]: string } = {
    5: "/img/sample1.jpg",
    12: "/img/sample2.jpg",
    20: "/img/sample3.jpg",
  };

  const prevMonth = () => setCurrentDate(currentDate.subtract(1, "month"));
  const nextMonth = () => setCurrentDate(currentDate.add(1, "month"));

  const days = [];
  for (let i = 0; i < startDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth}>◀</button>
        <h2 className="text-xl font-bold">{currentDate.format("YYYY.MM")}</h2>
        <button onClick={nextMonth}>▶</button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {["일", "월", "화", "수", "목", "금", "토"].map((d) => (
          <div key={d} className="text-center font-semibold">
            {d}
          </div>
        ))}

        {days.map((day, idx) => (
          <div
            key={idx}
            className="h-12 border rounded-lg relative flex justify-center items-center"
          >
            {day && (
              <>
                <span className="absolute top-1 left-1 text-sm">{day}</span>
                {images[day] && (
                  <CommonEmotionImage src={checkEmotion("JOY")} size={"xl"} />
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
