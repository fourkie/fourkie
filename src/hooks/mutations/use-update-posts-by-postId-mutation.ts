import { updatePostsByPostId } from "@/services/post-service";
import { useMutation } from "@tanstack/react-query";

export const useUpdatePostsByPostIdMutation = () =>
  useMutation({
    mutationFn: updatePostsByPostId,
  });
