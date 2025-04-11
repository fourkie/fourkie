import { QUERY_KEY } from "@/constants/query-keys.constant";
import { getUserById } from "@/services/user-service";
import { useQuery } from "@tanstack/react-query";

export const useGetUserByIdQuery = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.USER, userId],
    queryFn: () => getUserById({ userId }),
  });
};
