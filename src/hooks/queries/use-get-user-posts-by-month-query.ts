import { QUERY_KEY } from "@/constants/query-keys.constant";
import { getPostEmotionByUserId } from "@/services/home-client";
import { useQuery } from "@tanstack/react-query";

export const useGetUserPostByMonthQuery = (
  userId: string | undefined,
  year: number,
  month: number,
) => {
  return useQuery({
    //키값: usrid, year, month
    queryKey: [QUERY_KEY.USER, userId, year, month],
    queryFn: () => getPostEmotionByUserId(userId, year, month),
  });
};
