"use client";

import { EMOTIONS_QUERY } from "@/constants/emotion.constant";
import Popup from "@/ui/common/popup-bg.common";
import { convertEmotions } from "@/utils/emotion-convert";
import { useEffect, useState } from "react";
import { PostingResultModalProps } from "../type";
import PostingEmotionModalButton from "./posting-emotion-modal-button";
import PostingEmotionModalLoading from "./posting-emotion-modal-loading";
import PostingEmotionModalSlide from "./posting-emotion-modal-slice";

const PostingEmotionModal = ({
  userId,
  emotion,
  postId,
  isPending,
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
    return <PostingEmotionModalLoading />;
  }

  return (
    <>
      {emotion && isModalOpen && (
        <Popup>
          <div className="mx-5 flex w-full max-w-[380px] flex-col gap-5 rounded-2xl bg-white px-12 py-6 shadow-lg">
            <h2 className="text-center text-xl font-bold text-grey-7">
              {EMOTIONS_QUERY[currentEmotionKey]}
            </h2>

            <PostingEmotionModalSlide
              currentEmotionKey={currentEmotionKey}
              emotionKeys={emotionKeys}
              setSlideIndex={setSlideIndex}
            />

            <p className="text-center text-sm font-medium text-grey-5">
              선택된 감정에 어울리는
              <br />
              플레이 리스트를 추천해드릴게요!
            </p>

            <PostingEmotionModalButton
              onClose={() => setIsModalOpen(false)}
              userId={userId}
              currentEmotion={currentEmotionKey}
              postId={postId}
            />
          </div>
        </Popup>
      )}
    </>
  );
};

export default PostingEmotionModal;
