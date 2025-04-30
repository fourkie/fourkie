import { getPostEmotionByUserId } from "@/services/home-client-service";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useInfiniteUserPostsByMonth = (
  userId: string | undefined,
  selectedDate: Date,
) => {
  return useInfiniteQuery({
    queryKey: ["userPostsInfinite", selectedDate],
    initialPageParam: {
      year: selectedDate.getFullYear(),
      month: selectedDate.getMonth() + 1,
    },
    queryFn: async ({ pageParam }) => {
      const { year, month } = pageParam;
      const data = await getPostEmotionByUserId(userId, year, month);
      return { data, year, month };
    },
    enabled: !!userId && !!selectedDate,
    getNextPageParam: (lastPage) => {
      const nextDate = new Date(lastPage.year, lastPage.month);
      return {
        year: nextDate.getFullYear(),
        month: nextDate.getMonth() + 1,
      };
    },
    getPreviousPageParam: (firstPage) => {
      const prevDate = new Date(firstPage.year, firstPage.month - 2);
      return {
        year: prevDate.getFullYear(),
        month: prevDate.getMonth() + 1,
      };
    },
  });
};
