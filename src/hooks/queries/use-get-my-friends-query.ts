import { QUERY_KEY } from "@/constants/query-keys.constant";
import { getMyFriends } from "@/services/my-friends-service";
import usePollingQuery from "../polling/use-polling-query";

export const useGetMyFriendsQuery = () => {
  return usePollingQuery({
    queryKey: [QUERY_KEY.MY_FRIENDS],
    queryFn: getMyFriends,
  });
};
