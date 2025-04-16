import { TOAST_MESSAGE } from "@/constants/toast-message.constant";
import { updatePostsByPostId } from "@/services/post-service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const useUpdatePostsByPostIdMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: updatePostsByPostId,

    onSuccess: () => {
      toast.success(TOAST_MESSAGE.POST.EDIT.SUCCESS);
      router.push("/music");
    },

    onError: () => {
      toast.error(TOAST_MESSAGE.POST.EDIT.ERROR);
    },
  });
};
