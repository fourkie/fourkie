import { QUERY_KEY } from "@/constants/query-keys.constant";
import { getUserNickname } from "@/services/home-client-service";
import { useQuery } from "@tanstack/react-query";

export const useGetUserNicknameByIdQuery = (
  userId: string | undefined,
  options?: { enabled?: boolean },
) => {
  return useQuery({
    queryKey: [QUERY_KEY.USER_NICKNAME, userId],
    queryFn: () => getUserNickname(userId),
    enabled: options?.enabled ?? true,
  });
};
