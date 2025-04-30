import { QUERY_KEY } from "@/constants/query-keys.constant";
import { getPostEmotionByUserId } from "@/services/home-client-service";
import { useQuery } from "@tanstack/react-query";

export const useGetUserPostByMonthQuery = (
  userId: string | undefined,
  year: number,
  month: number,
) => {
  return useQuery({
    queryKey: [QUERY_KEY.USER, year, month],
    queryFn: () => getPostEmotionByUserId(userId, year, month),
  });
};
