import { removePost } from "@/services/post-service";
import { useMutation } from "@tanstack/react-query";

export const useRemovePostMutation = ({ postId }: { postId: number }) => {
  return useMutation({
    mutationFn: () => removePost(postId),
    onSuccess: () => {
      console.log("일기가 삭제되었습니다");
    },
    onError: (error) => {
      console.error(error.message);
    },
  });
};
