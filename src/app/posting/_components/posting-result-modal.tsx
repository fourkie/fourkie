"use client";

import { ChevronLeft, ChevronRight, Loader } from "lucide-react";
import { PostingResultModalProps } from "../type";
import { useState } from "react";

const PostingResultModal = ({
  emotions,
  isPending,
  nickname,
}: PostingResultModalProps) => {
  const [slideIndex, setSlideIndex] = useState(0);

  const handleEmotionsSlide = (n: number) => {
    setSlideIndex((prev) => {
      const newIndex = prev + n;
      return newIndex >= emotions.length
        ? 0
        : newIndex < 0
        ? emotions.length - 1
        : newIndex;
    });
  };

  return (
    <>
      <h1 className="mt-4 font-bold">감정 분석 결과</h1>

      {emotions ? (
        <>
          <div className="flex justify-center items-center mt-2">
            <ChevronLeft onClick={() => handleEmotionsSlide(-1)} />
            <h2 className="text-2xl font-bold">{emotions[slideIndex]}</h2>
            <ChevronRight onClick={() => handleEmotionsSlide(1)} />
          </div>

          <p> 선택된 감정에 따른 플레이 리스트를 추천해드려요 {slideIndex}</p>
        </>
      ) : (
        isPending && (
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
        )
      )}
    </>
  );
};

export default PostingResultModal;
