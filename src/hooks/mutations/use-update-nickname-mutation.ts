import { QUERY_KEY } from "@/constants/query-keys.constant";
import { upDateMyNickname } from "@/services/nickname-service";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";

export const useUpdateNicknameMutation = (): UseMutationResult<
  void,
  Error,
  string
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: upDateMyNickname,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.USER_NICKNAME] });
    },
  });
};
