import { QUERY_KEY } from "@/constants/query-keys";
import { getUserById } from "@/services/user-services";
import { useQuery } from "@tanstack/react-query";

export const useGetUserByIdQuery = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.USER, userId],
    queryFn: () => getUserById({ userId }),
  });
};
