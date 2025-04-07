import { postEmotion } from "@/services/posting-services";
import { useMutation } from "@tanstack/react-query";

export const usePostEmotionMutation = () => {
  return useMutation({
    mutationFn: postEmotion,
  });
};
