import { QUERY_KEY } from "@/constants/query-keys.constant";
import { TOAST_MESSAGE } from "@/constants/toast-message.constant";
import { createPosts } from "@/services/post-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const useCreatePostsMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPosts,

    onSuccess: () => {
      toast.success(TOAST_MESSAGE.POST.POSTING.SUCCESS);
      queryClient.invalidateQueries({queryKey: [QUERY_KEY.POSTS]})
      router.push("/music");
    },

    onError: () => {
      toast.error(TOAST_MESSAGE.POST.POSTING.ERROR);
    },
  });
};
