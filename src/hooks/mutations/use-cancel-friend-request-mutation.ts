import { QUERY_KEY } from "@/constants/query-keys.constant";
import { TOAST_MESSAGE } from "@/constants/toast-message.constant";
import { cancelFriendRequest } from "@/services/friend-request-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useCancelFriendRequestMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (requestId: number) => cancelFriendRequest(requestId),
    onSuccess: () => {
      toast.success(TOAST_MESSAGE.MYPAGE.FRIEND_CANCEL_SUCCESS);
      queryClient.invalidateQueries({ queryKey: ["sent-request"] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.POSTS, QUERY_KEY.MY_FRIENDS],
      });
    },
    onError: () => {
      toast.error(TOAST_MESSAGE.MYPAGE.FRIEND_CNACEL_ERROR);
    },
  });
};
