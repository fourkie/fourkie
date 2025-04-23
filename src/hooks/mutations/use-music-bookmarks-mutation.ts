import { BookmarkedProps } from "@/app/music/type";
import { QUERY_KEY } from "@/constants/query-keys.constant";
import {
  addBookmarkedPlaylists,
  removeBookmarkedPlaylists,
} from "@/services/music-bookmark-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// 북마크 추가
export const useAddBookmarkMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addBookmarkedPlaylists,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.BOOKMARKED_PLAYLISTS],
      });
    },
  });
};

// 북마크 삭제
export const useRemoveBookmarkMutation = ({
  musicPlaylistId,
  userId,
}: BookmarkedProps) => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, BookmarkedProps>({
    mutationFn: () => removeBookmarkedPlaylists(musicPlaylistId, userId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.BOOKMARKED_PLAYLISTS],
      });

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.BOOKMARKED_PLAYLISTS, userId],
      });
    },
  });
};
