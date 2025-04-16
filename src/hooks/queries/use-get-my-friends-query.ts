import { QUERY_KEY } from "@/constants/query-keys.constant";
import { getMyFriends } from "@/services/my-friends-service";
import { useQuery } from "@tanstack/react-query";

export const useGetMyFriendsQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEY.MY_FRIENDS],
    queryFn: getMyFriends,
  });
};
