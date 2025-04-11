import { QUERY_KEY } from "@/constants/query-keys.constant";
import { getAllPosts } from "@/services/post-service";
import { useQuery } from "@tanstack/react-query";

export const useGetAllPostsQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEY.POSTS],
    queryFn: getAllPosts,
  });
};
