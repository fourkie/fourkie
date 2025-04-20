import { QUERY_KEY } from "@/constants/query-keys.constant";
import { removePost } from "@/services/post-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { toast } from "react-toastify";

export const useRemovePostMutation = ({ postId }: { postId: number }) => {
  const queryClient = useQueryClient();
  const year = dayjs().year();
  const month = dayjs().month() + 1;

  return useMutation({
    mutationFn: () => removePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.POSTS] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.BY_USER_AND_TODAY],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.USER, year, month],
      });
      toast.success("일기가 삭제되었습니다");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
