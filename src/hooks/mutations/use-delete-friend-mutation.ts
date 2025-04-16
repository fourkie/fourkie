import { QUERY_KEY } from "@/constants/query-keys.constant";
import { deleteFriend } from "@/services/friend-request-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteFriendMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFriend,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.MY_FRIENDS],
      });
    },
  });
};
