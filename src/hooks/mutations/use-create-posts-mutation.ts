import { createPosts } from "@/services/post-service";
import { useMutation } from "@tanstack/react-query";

export const useCreatePostsMutation = () =>
  useMutation({
    mutationFn: createPosts,
  });
