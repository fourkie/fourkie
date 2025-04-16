import { TOAST_MESSAGE } from "@/constants/toast-message.constant";
import { createPosts } from "@/services/post-service";
import { useMutation } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

export const useCreatePostsMutation = () =>
  useMutation({
    mutationFn: createPosts,

    onSuccess: () => {
      toast.success(TOAST_MESSAGE.POSTING.SUCCESS);
      redirect("/music");
    },

    onError: (error) => {
      toast.error(TOAST_MESSAGE.POSTING.ERROR);
      console.error(error);
    },
  });
