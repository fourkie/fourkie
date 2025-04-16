import { QUERY_KEY } from "@/constants/query-keys.constant";
import { TOAST_MESSAGE } from "@/constants/toast-message.constant";
import { acceptFriendRequest } from "@/services/friend-request-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useAcceptFriendRequestMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (requestId: number) => acceptFriendRequest(requestId),
    onSuccess: () => {
      toast.success(TOAST_MESSAGE.MYPAGE.FRIEND_ACCEPT_SUCCESS);
      queryClient.invalidateQueries({ queryKey: ["received-requests"] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.MY_FRIENDS] });
    },
    onError: () => {
      toast.error(TOAST_MESSAGE.MYPAGE.FRIEND_ACCEPT_ERROR);
    },
  });
};
