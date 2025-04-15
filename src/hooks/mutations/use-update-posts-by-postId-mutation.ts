import { TOAST_MESSAGE } from "@/constants/toast-message.constant";
import { updatePostsByPostId } from "@/services/post-service";
import { useMutation } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

export const useUpdatePostsByPostIdMutation = () =>
  useMutation({
    mutationFn: updatePostsByPostId,

    onSuccess: () => {
      toast.success(TOAST_MESSAGE.EDIT.SUCCESS);
      redirect("/music");
    },

    onError: (error) => {
      toast.error(TOAST_MESSAGE.EDIT.ERROR);
      console.error(error);
    },
  });
