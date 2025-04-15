import { QUERY_KEY } from "@/constants/query-keys.constant";
import { searchUserByNicknameOrEmail } from "@/services/user-search-service";
import { useQuery } from "@tanstack/react-query";

export const useSearchUserQuery = (searchKeyword: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.SEARCH_USER, searchKeyword],
    queryFn: () => searchUserByNicknameOrEmail(searchKeyword),
    enabled: !!searchKeyword,
  });
};
