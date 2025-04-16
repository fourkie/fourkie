import { QUERY_KEY } from "@/constants/query-keys.constant";
import { getPostsByPostId } from "@/services/post-service";
import { useQuery } from "@tanstack/react-query";

export const useGetPostsByPostIdQuery = ({ postId }: { postId?: string }) => {
  return useQuery({
    queryKey: [QUERY_KEY.POSTS, postId],
    queryFn: () => getPostsByPostId({ postId }),
    enabled: !!postId,
  });
};
