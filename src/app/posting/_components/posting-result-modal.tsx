"use client";

import { usePostAnalyzedEmotionMutation } from "@/hooks/mutations/use-post-emotion-mutation";
import React from "react";

const PostingResultModal = () => {
  const { data: emotions, isPending } = usePostAnalyzedEmotionMutation();

  return (
    <>
      <h1 className="mt-4 font-bold">감정 분석 결과</h1>

      {emotions ? (
        <>
          <ul className="bg-gray-100 p-4 rounded mt-2 text-sm list-disc list-inside">
            {emotions.map((label: string, index: number) => (
              <li key={index}>{label}</li>
            ))}
          </ul>

          <p> 선택된 감정에 따른 플레이 리스트를 추천해드려요</p>
        </>
      ) : (
        <p className="text-gray-500 mt-2">
          {isPending && "ai가 ㅇㅇ님의 기분을 분석중이에요 조금만 기다려주세오"}
        </p>
      )}
    </>
  );
};

export default PostingResultModal;
