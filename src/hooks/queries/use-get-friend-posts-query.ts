import { useQuery } from "@tanstack/react-query";
import { getFriendsPosts } from "@/services/friend-service";
import { QUERY_KEY } from "@/constants/query-keys.constant";

export const useGetFriendPostsQuery = ({ userId }: { userId: string }) => {
  return useQuery({
    queryKey: [QUERY_KEY, "friend-posts", userId],
    queryFn: () => getFriendsPosts({ userId }),
    enabled: !!userId,
  });
};
