import { getSentRequests } from "@/services/friend-request-service";

import { useQuery } from "@tanstack/react-query";

export const useGetSentRequestsQuery = (userId: string) => {
  return useQuery({
    queryKey: ["sent-request", userId],
    queryFn: () => getSentRequests(userId),
    enabled: !!userId,
  });
};
