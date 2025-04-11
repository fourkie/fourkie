"use client";

import { ChevronLeft, ChevronRight, Loader } from "lucide-react";
import { Mood, PostingResultModalProps } from "../type";
import { useState } from "react";

const PostingResultModal = ({
  emotions,
  isPending,
  nickname,
  isModalOpen,
  setIsModalOpen,
}: PostingResultModalProps) => {
  const [slideIndex, setSlideIndex] = useState(0);

  const handleEmotionsSlide = (n: number) => {
    setSlideIndex((prev) => {
      const newIndex = prev + n;
      return newIndex >= moods.length
        ? 0
        : newIndex < 0
        ? moods.length - 1
        : newIndex;
    });
  };

  // test 데이터입니다.
  const moods: Mood[] = [
    { name: "기쁨", icon: "^‿^", color: "#C0DE95" },
    { name: "신나는", icon: "⌒‿⌒", color: "#FFF4BC" },
    { name: "설레이는", icon: "♡‿♡", color: "#FFAFAF" },
    { name: "감사한", icon: "ᵔ‿ᵔ", color: "#FBD176" },
    { name: "평온한", icon: "◡‿◡", color: "#B0DDFF" },
    { name: "외로움", icon: "•́‿•̀", color: "#8E9B62" },
    { name: "긴장되는", icon: "⊙﹏⊙", color: "#B393E0" },
    { name: "아픈", icon: "﹏︵﹏", color: "#AF9D7E" },
    { name: "슬픔", icon: "︵︵", color: "#8DD6E6" },
    { name: "분노", icon: ">︵<", color: "#DE6868" },
  ];

  if (isPending && !emotions) {
    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
        <div className="flex flex-col items-center justify-center bg-black text-white p-4 rounded-lg max-w-xs">
          <div className="flex items-center justify-center mb-1">
            <Loader className="h-5 w-5 animate-spin mr-2" />
            <span className="text-sm">
              ai가 {nickname}님의 기분을 분석중이에요
            </span>
          </div>
          <span className="text-sm">조금만 기다려주세요</span>
        </div>
      </div>
    );
  }

  return (
    <>
      {emotions && isModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl max-w-xs w-full p-6 shadow-lg">
            <h2 className=" text-2xl font-bold text-center text-primary-400 mb-4">
              {moods[slideIndex].name}
            </h2>

            <div className="flex items-center justify-center gap-4 mb-4">
              <ChevronLeft
                onClick={() => handleEmotionsSlide(-1)}
                className="cursor-pointer"
              />

              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-white animate-bounce"
                style={{ backgroundColor: moods[slideIndex].color }}
              >
                <span className="text-xl">{moods[slideIndex].icon}</span>
              </div>

              <ChevronRight
                onClick={() => handleEmotionsSlide(1)}
                className="cursor-pointer"
              />
            </div>

            <p className="text-center text-sm text-gray-600 mb-6">
              선택된 감정에 어울리는
              <br />
              플레이 리스트를 추천해드릴게요!
            </p>

            <div className="flex gap-3">
              <button
                className="flex-1 py-2 px-4 bg-grey-1 rounded-xl font-medium"
                onClick={() => {
                  setIsModalOpen(false);
                }}
              >
                취소
              </button>
              <button className="flex-1 py-2 px-4 bg-grey-1 rounded-xl font-medium">
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostingResultModal;
