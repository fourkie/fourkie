import { getReceivedRequests } from "@/services/friend-request-service";
import usePollingQuery from "../polling/use-polling-query";

export const useGetReceivedRequestQuery = (userId: string) => {
  return usePollingQuery({
    queryKey: ["received-request"],
    queryFn: () => getReceivedRequests(userId),
    enabled: !!userId,
  });
};
