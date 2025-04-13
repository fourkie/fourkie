import { QUERY_KEY } from "@/constants/query-keys.constant";
import { getUserNickname } from "@/services/home-client-service";
import { useQuery } from "@tanstack/react-query";

export const useGetUserNicknameByIdQuery = (
  userId: string | undefined,
  options?: { enabled?: boolean },
  //? 붙임 -> 선택적
) => {
  return useQuery({
    queryKey: [QUERY_KEY.NICKNAME, userId],
    queryFn: () => getUserNickname(userId),
    enabled: options?.enabled ?? true,
    //실행 설정 없으면(??) 실행
  });
};
