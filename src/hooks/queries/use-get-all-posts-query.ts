import { QUERY_KEY } from "@/constants/query-keys";
import { getAllPosts } from "@/services/post-services";
import { useQuery } from "@tanstack/react-query";

export const useGetAllPostsQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEY.POSTS],
    queryFn: getAllPosts,
  });
};
