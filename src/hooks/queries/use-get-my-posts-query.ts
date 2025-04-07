import { QUERY_KEY } from "@/constants/query-keys";
import { getMyPosts } from "@/services/post-services";
import { useQuery } from "@tanstack/react-query";

export const useGetMyPostsQuery = ({ userId }: { userId: string }) => {
  return useQuery({
    queryKey: [QUERY_KEY.POSTS, userId],
    queryFn: () => getMyPosts({ userId }),
    enabled: !!userId,
  });
};
