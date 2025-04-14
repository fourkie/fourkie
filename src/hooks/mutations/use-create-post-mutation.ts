import { createPost } from "@/services/post-service";
import { useMutation } from "@tanstack/react-query";

export const useCreatePostMutation = () =>
  useMutation({
    mutationFn: createPost,
  });
