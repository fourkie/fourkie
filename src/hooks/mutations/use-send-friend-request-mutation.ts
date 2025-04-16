import { sendFriendRequest } from "@/services/friend-request-service";
import { useMutation } from "@tanstack/react-query";

export const useSendFriendRequestMutation = () => {
  return useMutation({
    mutationFn: sendFriendRequest,
  });
};
