import { getSentRequests } from "@/services/friend-request-service";
import { getUserForClient } from "@/services/user-client-service";
import { useQuery } from "@tanstack/react-query";

export const useGetSentRequestsQuery = () => {
  const { userId } = getUserForClient();

  return useQuery({
    queryKey: ["sent-request", userId],
    queryFn: () => getSentRequests(userId),
    enabled: !!userId,
  });
};
