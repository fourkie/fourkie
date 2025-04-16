import { TOAST_MESSAGE } from "@/constants/toast-message.constant";
import { getAnalyzedPostEmotion } from "@/services/posting-service";
import { useMutation } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";

// tanstack-query를 사용하여 감정 분석 요청을 보내는 훅
export const useGetAnalyzedPostEmotionMutation = (
  setIsModalOpen: Dispatch<SetStateAction<boolean>>,
) => {
  return useMutation({
    mutationFn: getAnalyzedPostEmotion,

    onSuccess: () => {
      setIsModalOpen(true);
    },

    onError: () => {
      toast.error(TOAST_MESSAGE.AI.HUGGINGFACE.ERROR);
    },
  });
};
