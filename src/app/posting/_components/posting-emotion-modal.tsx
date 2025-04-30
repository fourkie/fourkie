"use client";

import { EMOTIONS_QUERY } from "@/constants/emotion.constant";
import Popup from "@/ui/common/popup-bg.common";
import { convertEmotions } from "@/utils/emotion-convert";
import { useEffect, useState } from "react";
import { PostingResultModalProps } from "../type";
import PostingEmotionModalButton from "./posting-emotion-modal-button";
import PostingEmotionModalSlide from "./posting-emotion-modal-slice";

const PostingEmotionModal = ({
  userId,
  emotion,
  postId,
  isModalOpen,
  setIsModalOpen,
}: PostingResultModalProps) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const emotionKeys = Object.keys(EMOTIONS_QUERY);
  const currentEmotionKey = emotionKeys[slideIndex];

  useEffect(() => {
    if (emotion) {
      const converted = convertEmotions(emotion);
      const index = emotionKeys.indexOf(converted);
      if (converted && index !== -1) {
        setSlideIndex(index);
      }
    }
  }, [emotion]);

  return (
    <>
      {emotion && isModalOpen && (
        <Popup
          aria-live="assertive"
          aria-labelledby="emotion-modal-title"
          aria-describedby="emotion-modal-description"
        >
          <div className="flex w-full max-w-[380px] flex-col gap-[18px] rounded-2xl bg-white px-12 py-5 shadow-lg">
            <h2
              id="emotion-modal-title"
              className="text-center text-xl text-grey-7"
            >
              <strong>{EMOTIONS_QUERY[currentEmotionKey]}</strong>
            </h2>

            <PostingEmotionModalSlide
              currentEmotionKey={currentEmotionKey}
              emotionKeys={emotionKeys}
              setSlideIndex={setSlideIndex}
            />

            <p
              id="emotion-modal-description"
              className="text-center text-sm font-medium text-grey-5"
            >
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
