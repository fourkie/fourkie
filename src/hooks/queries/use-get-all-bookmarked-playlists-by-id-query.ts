import { QUERY_KEY } from "@/constants/query-keys.constant";
import { fetchBookmarkedPlaylists } from "@/services/music-bookmark-service";
import { useQuery } from "@tanstack/react-query";

export const useGetAllBookmarkedPlaylistsByIdQuery = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.BOOKMARKED_PLAYLISTS, userId],
    queryFn: () => fetchBookmarkedPlaylists(userId),
    enabled: !!userId,
    refetchOnWindowFocus: false,
    retry: false,
  });
};
