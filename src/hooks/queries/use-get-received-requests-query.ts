import { getReceivedRequests } from "@/services/friend-request-service";
import { useQuery } from "@tanstack/react-query";

export const useGetReceivedRequestQuery = (userId: string) => {
  return useQuery({
    queryKey: ["received-request"],
    queryFn: () => getReceivedRequests(userId),
    enabled: !!userId,
  });
};
