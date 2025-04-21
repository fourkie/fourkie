import { QUERY_KEY } from "@/constants/query-keys.constant";
import { getFriendsPosts } from "@/services/friend-service";
import { useQuery } from "@tanstack/react-query";

export const useGetFriendPostsQuery = ({ userId }: { userId: string }) => {
  return useQuery({
    queryKey: [QUERY_KEY.POSTS, QUERY_KEY.MY_FRIENDS, userId],
    queryFn: () => getFriendsPosts({ userId }),
    enabled: !!userId,
  });
};
