import { getAnalyzedPostEmotion } from "@/services/posting-service";
import { useMutation } from "@tanstack/react-query";

// tanstack-query를 사용하여 감정 분석 요청을 보내는 훅
export const useGetAnalyzedPostEmotionMutation = () => {
  return useMutation({
    mutationFn: getAnalyzedPostEmotion,
  });
};
