import { useQuery, UseQueryOptions } from "@tanstack/react-query";

interface UsePollingQueryProps<TQueryFnData> {
  queryKey: unknown[];
  queryFn: () => Promise<TQueryFnData>;
  refetchInterval?: number;
  options?: UseQueryOptions<TQueryFnData>;
  enabled?: boolean;
}

const usePollingQuery = <TQueryFnData>({
  queryKey,
  queryFn,
  refetchInterval = 5000,
  options,
  enabled,
}: UsePollingQueryProps<TQueryFnData>) => {
  return useQuery<TQueryFnData>({
    queryKey,
    queryFn,
    refetchInterval,
    refetchOnWindowFocus: true,
    staleTime: 10000,
    ...options,
  });
};

export default usePollingQuery;
