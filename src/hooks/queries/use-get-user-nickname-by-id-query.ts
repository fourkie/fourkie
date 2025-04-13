import { QUERY_KEY } from "@/constants/query-keys.constant";
import { getUserNickname } from "@/services/home-client-service";
import { useQuery } from "@tanstack/react-query";

export const useGetUserNicknameByIdQuery = (userId: string | undefined) => {
  return useQuery({
    queryKey: [QUERY_KEY.NICKNAME, userId],
    queryFn: () => getUserNickname(userId),
    enabled: !!userId,
  });
};
