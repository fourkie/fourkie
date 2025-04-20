import { QUERY_KEY } from "@/constants/query-keys.constant";
import { getPostsByUserIdAndToday } from "@/services/post-service";
import { useQuery } from "@tanstack/react-query";

export const useGetPostsByUserIdAndTodayQuery = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.BY_USER_AND_TODAY, userId],
    queryFn: () => getPostsByUserIdAndToday(userId),
    enabled: !!userId,
  });
};
