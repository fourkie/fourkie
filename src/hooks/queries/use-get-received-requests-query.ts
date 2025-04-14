import { getReceivedRequests } from "@/services/friend-request-service";
import { getUserForClient } from "@/services/user-client-service";
import { useQuery } from "@tanstack/react-query";

export const useGetReceivedRequestQuery = () => {
  const { userId } = getUserForClient();

  return useQuery({
    queryKey: ["received-requests", userId],
    queryFn: () => getReceivedRequests(userId),
    enabled: !!userId,
  });
};
