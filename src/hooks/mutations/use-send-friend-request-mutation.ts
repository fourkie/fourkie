import { QUERY_KEY } from "@/constants/query-keys.constant";
import { TOAST_MESSAGE } from "@/constants/toast-message.constant";
import { sendFriendRequest } from "@/services/friend-request-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useSendFriendRequestMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => {
      toast.success(TOAST_MESSAGE.MYPAGE.FRIEND_REQUEST_SUCCESS);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.MY_FRIENDS] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.POSTS, QUERY_KEY.MY_FRIENDS],
      });
    },
    onError: () => {
      toast.error(TOAST_MESSAGE.MYPAGE.FRIEND_REQUEST_ERROR);
    },
  });
};
