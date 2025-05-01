import { QUERY_KEY } from "@/constants/query-keys.constant";
import { TOAST_MESSAGE } from "@/constants/toast-message.constant";
import { createPosts } from "@/services/post-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { usePostingStore } from "../zustand/posting-store";

export const useCreatePostsMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const year = dayjs().year();
  const month = dayjs().month() + 1;
  const clearInput = usePostingStore.getState().clearInput;

  return useMutation({
    mutationFn: createPosts,

    onSuccess: () => {
      router.push("/music");
      toast.success(TOAST_MESSAGE.POST.POSTING.SUCCESS);
      clearInput();
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.POSTS] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.BY_USER_AND_TODAY],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.USER, year, month],
      });
      queryClient.invalidateQueries({
        queryKey: ["userPostsInfinite"],
      });
    },

    onError: () => {
      toast.error(TOAST_MESSAGE.POST.POSTING.ERROR);
    },
  });
};
