"use client";

import { PostingResultModalProps } from "../type";
import { useEffect, useState } from "react";
import { convertEmotions } from "@/utils/emotion-convert";
import { EMOTIONS_QUERY } from "@/constants/emotion.constant";
import PostingEmotionModalSlide from "./posting-emotion-modal-slice";
import PostingEmotionModalButton from "./posting-emotion-modal-button";
import PostingEmotionModalLoading from "./posting-emotion-modal-loading";

const PostingEmotionModal = ({
  userId,
  title,
  content,
  emotion,
  postId,
  isPending,
  nickname,
  isModalOpen,
  setIsModalOpen,
}: PostingResultModalProps) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const emotionKeys = Object.keys(EMOTIONS_QUERY);
  const currentEmotionKey = emotionKeys[slideIndex];

  // 감정 데이터가 변경될 때 슬라이드 인덱스를 업데이트
  useEffect(() => {
    if (emotion) {
      const converted = convertEmotions(emotion);
      const index = emotionKeys.indexOf(converted);
      if (converted && index !== -1) {
        setSlideIndex(index);
      }
    }
  }, [emotion]);

  if (isPending && !emotion) {
    return <PostingEmotionModalLoading nickname={nickname} />;
  }

  return (
    <>
      {emotion && isModalOpen && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          <div className="flex flex-col gap-5 bg-white rounded-2xl w-full mx-5 px-12 py-6 shadow-lg">
            <h2 className="text-xl font-bold text-center text-grey-7">
              {EMOTIONS_QUERY[currentEmotionKey]}
            </h2>

            <PostingEmotionModalSlide
              currentEmotionKey={currentEmotionKey}
              emotionKeys={emotionKeys}
              setSlideIndex={setSlideIndex}
            />

            <p className="text-center font-medium text-sm text-grey-5">
              선택된 감정에 어울리는
              <br />
              플레이 리스트를 추천해드릴게요!
            </p>

            <PostingEmotionModalButton
              onClose={() => setIsModalOpen(false)}
              userId={userId}
              title={title}
              content={content}
              currentEmotion={currentEmotionKey}
              postId={postId}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PostingEmotionModal;
