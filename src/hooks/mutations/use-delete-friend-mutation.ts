import { QUERY_KEY } from "@/constants/query-keys.constant";
import { deleteFriend } from "@/services/friend-request-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useDeleteFriendMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFriend,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sent-request"] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.POSTS, QUERY_KEY.MY_FRIENDS],
      });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.MY_FRIENDS] });
    },
    onError: () => {
      toast.error("친구 삭제 실패");
    },
  });
};
