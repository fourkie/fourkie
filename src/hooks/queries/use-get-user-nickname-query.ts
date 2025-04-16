import { QUERY_KEY } from "@/constants/query-keys.constant";
import { getUserNickname } from "@/services/nickname-service";
import { useQuery } from "@tanstack/react-query";

export const useGetUserNicknameQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEY.USER_NICKNAME],
    queryFn: getUserNickname,
  });
};
