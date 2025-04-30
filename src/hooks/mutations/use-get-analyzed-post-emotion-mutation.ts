import { TOAST_MESSAGE } from "@/constants/toast-message.constant";
import { getAnalyzedPostEmotion } from "@/services/posting-service";
import { useMutation } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";

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
