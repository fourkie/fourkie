import { QUERY_KEY } from "@/constants/query-keys.constant";
import { TOAST_MESSAGE } from "@/constants/toast-message.constant";
import {
  addBookmarkedPlaylists,
  removeBookmarkedPlaylists,
} from "@/services/music-bookmark-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

// 북마크 추가 뮤테이션 훅
export const useAddBookmarkMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      musicPlaylistId,
      userId,
    }: {
      musicPlaylistId: string;
      userId: string;
    }) => addBookmarkedPlaylists(musicPlaylistId, userId),

    onSuccess: (_, variables) => {
      toast.success(TOAST_MESSAGE.SPOTIFY.ADD_BOOKMARK_SUCCESS);

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.BOOKMARKED_PLAYLISTS, variables.userId],
      });
    },

    onError: () => {
      toast.error(TOAST_MESSAGE.SPOTIFY.ADD_BOOKMARK_ERROR);
    },
  });
};

// 북마크 삭제 뮤테이션 훅
export const useRemoveBookmarkMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      musicPlaylistId,
      userId,
    }: {
      musicPlaylistId: string;
      userId: string;
    }) => removeBookmarkedPlaylists(musicPlaylistId, userId),

    onSuccess: (_, variables) => {
      toast.success(TOAST_MESSAGE.SPOTIFY.REMOVE_BOOKMARK_SUCCESS);

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.BOOKMARKED_PLAYLISTS, variables.userId],
      });
    },

    onError: () => {
      toast.error(TOAST_MESSAGE.SPOTIFY.REMOVE_BOOKMARK_ERROR);
    },
  });
};
