import { QUERY_KEY } from "@/constants/query-keys.constant";
import { getAllPostsById } from "@/services/post-service";
import { useQuery } from "@tanstack/react-query";

export const useGetAllPostsByIdQuery = ({ userId }: { userId: string }) => {
  return useQuery({
    queryKey: [QUERY_KEY.POSTS, userId],
    queryFn: () => getAllPostsById({ userId }),
    enabled: !!userId,
  });
};
