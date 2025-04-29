import { QUERY_KEY } from "@/constants/query-keys.constant";
import { getFriendsPosts } from "@/services/friend-service";
import usePollingQuery from "../polling/use-polling-query";

export const useGetFriendPostsQuery = ({ userId }: { userId: string }) => {
  return usePollingQuery({
    queryKey: [QUERY_KEY.POSTS, QUERY_KEY.MY_FRIENDS],
    queryFn: () => getFriendsPosts({ userId }),
    enabled: !!userId,
  });
};
