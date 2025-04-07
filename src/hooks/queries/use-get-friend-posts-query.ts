import { useQuery } from "@tanstack/react-query";
import { getFriendsPosts } from "@/services/friend-services";
import { QUERY_KEY } from "@/constants/query-keys";

export const useGetFriendPostsQuery = ({ userId }: { userId: string }) => {
  return useQuery({
    queryKey: [QUERY_KEY, "friend-posts", userId],
    queryFn: () => getFriendsPosts({ userId }),
    enabled: !!userId,
  });
};
