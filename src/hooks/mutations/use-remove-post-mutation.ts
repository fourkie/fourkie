import { QUERY_KEY } from "@/constants/query-keys.constant";
import { removePost } from "@/services/post-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { toast } from "react-toastify";

export const useRemovePostMutation = ({
  postId,
  userId,
}: {
  postId: number;
  userId: string;
}) => {
  const queryClient = useQueryClient();
  const year = dayjs().year();
  const month = dayjs().month() + 1;

  return useMutation({
    mutationFn: () => removePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.POSTS, userId] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.USER, year, month],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.SPOTIFY_PLAYLISTS],
      });

      queryClient.setQueryData([QUERY_KEY.BY_USER_AND_TODAY], null);
      queryClient.setQueryData([QUERY_KEY.POSTID, postId], null);

      toast.success("일기가 삭제되었습니다");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
