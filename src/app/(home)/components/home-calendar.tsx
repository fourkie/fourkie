"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { CommonEmotionImage } from "@/_components/common-emotion-image";
import { checkEmotion } from "@/utils/home-emotion.util";
import { HomePost } from "../types/HomePost";
import { getPostEmotionByUserId } from "@/services/home-client";
import { useRouter } from "next/navigation";

const HomeCalendar = ({ userId }: { userId: string | undefined }) => {
  const route = useRouter();
  if (!userId) {
    route.push("/sign-in");
  }

  //달력에 표시된 날 바꾸기 위해 state로 관리 하위 컴포넌트로 전달해줄거임
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [images, setImages] = useState<{ [key: number]: string }>({});

  //시작 달, 시작 날 기록 끝 날짜는 daysInMonth 함수 사용해서 괜찮을 것 같음.
  //daysInMonth 함수가 뭐냐?
  //dayjs().daysInMonth() 형식으로 사용하는 것으로 현재 날짜가 속한 달의 일수를 알려줌
  //currentDate 가 dayjs()로 초기화 되어있으니 이렇게 사용함.
  const startOfMonth = currentDate.startOf("month");
  const startDay = startOfMonth.day();
  const daysInMonth = currentDate.daysInMonth();

  useEffect(() => {
    const fetchData = async () => {
      const userPosts: HomePost[] | boolean = await getPostEmotionByUserId(
        userId,
        currentDate.year(),
        currentDate.month() + 1,
      );

      if (!userPosts) {
        console.log("값 없음");
        return;
      }

      const newImages: { [key: number]: string } = {};
      userPosts.forEach((post) => {
        const day = parseInt(post.post_created_at.slice(8, 10));
        newImages[day] = post.post_emotion;
      });

      setImages(newImages);
    };

    fetchData();
  }, [currentDate]);

  const prevMonth = () => setCurrentDate(currentDate.subtract(1, "month"));
  const nextMonth = () => setCurrentDate(currentDate.add(1, "month"));

  const days = [];
  for (let i = 0; i < startDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  return (
    <div className="w-full max-w-md mx-auto shadow-xl p-5">
      <div className="flex justify-between items-center mb-4 ">
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
            className="h-16 rounded-lg relative flex justify-center items-center"
          >
            {day && (
              <>
                {images[day] ? (
                  <CommonEmotionImage
                    src={checkEmotion(images[day])}
                    size={"xl"}
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
