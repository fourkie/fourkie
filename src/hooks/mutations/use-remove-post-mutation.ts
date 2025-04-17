import { QUERY_KEY } from "@/constants/query-keys.constant";
import { removePost } from "@/services/post-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useRemovePostMutation = ({ postId }: { postId: number }) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => removePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [QUERY_KEY.POSTS]})
      toast.success("일기가 삭제되었습니다");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
