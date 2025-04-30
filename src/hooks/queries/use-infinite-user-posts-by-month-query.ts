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
      // 다음 달 계산
      const nextDate = new Date(lastPage.year, lastPage.month); // 자동으로 넘어감
      return {
        year: nextDate.getFullYear(),
        month: nextDate.getMonth() + 1,
      };
    },
    getPreviousPageParam: (firstPage) => {
      // 이전 달 계산
      const prevDate = new Date(firstPage.year, firstPage.month - 2);
      return {
        year: prevDate.getFullYear(),
        month: prevDate.getMonth() + 1,
      };
    },
  });
};
