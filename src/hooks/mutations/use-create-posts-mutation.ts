import { TOAST_MESSAGE } from "@/constants/toast-message.constant";
import { createPosts } from "@/services/post-service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const useCreatePostsMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: createPosts,

    onSuccess: () => {
      toast.success(TOAST_MESSAGE.POST.POSTING.SUCCESS);
      router.push("/music");
    },

    onError: () => {
      toast.error(TOAST_MESSAGE.POST.POSTING.ERROR);
    },
  });
};
