import { QUERY_KEY } from "@/constants/query-keys.constant";
import { TOAST_MESSAGE } from "@/constants/toast-message.constant";
import { updatePostsByPostId } from "@/services/post-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const useUpdatePostsByPostIdMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const year = dayjs().year();
  const month = dayjs().month() + 1;
  return useMutation({
    mutationFn: updatePostsByPostId,

    onSuccess: () => {
      toast.success(TOAST_MESSAGE.POST.EDIT.SUCCESS);
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.USER, year, month],
      });
      queryClient.invalidateQueries({queryKey: [QUERY_KEY.POSTS]})
      router.push("/music");
    },

    onError: () => {
      toast.error(TOAST_MESSAGE.POST.EDIT.ERROR);
    },
  });
};
