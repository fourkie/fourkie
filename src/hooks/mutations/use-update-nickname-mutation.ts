import { QUERY_KEY } from "@/constants/query-keys.constant";
import { TOAST_MESSAGE } from "@/constants/toast-message.constant";
import { upDateMyNickname } from "@/services/nickname-service";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useUpdateNicknameMutation = ({
  userId,
}: {
  userId: string;
}): UseMutationResult<void, Error, string> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: upDateMyNickname,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.USER_NICKNAME] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.USER_NICKNAME, userId] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.USER, userId] });
    },
    onError: () => {
      toast.error(TOAST_MESSAGE.MYPAGE.CHANGE_NICKNAME_ERROR);
    },
  });
};
