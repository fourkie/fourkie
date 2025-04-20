import { QUERY_KEY } from "@/constants/query-keys.constant";
import { getPostTodayEmotionById } from "@/services/post-service";
import { useQuery } from "@tanstack/react-query";

export const useGetPostTodayEmotionByIdQuery = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.BY_USER_AND_TODAY, userId],
    queryFn: () => getPostTodayEmotionById(userId),
    enabled: !!userId,
  });
};
