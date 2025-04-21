import { QUERY_KEY } from "@/constants/query-keys.constant";
import { TOAST_MESSAGE } from "@/constants/toast-message.constant";
import {
  addBookmarkedPlaylists,
  removeBookmarkedPlaylists,
} from "@/services/music-bookmark-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

type BookmarkedProps = {
  musicPlaylistId: string;
  userId: string;
};

// 북마크 추가 뮤테이션 훅
// 같은 music_playlist_id를 추가할 경우, 다른 사용자 껏도 추가됨
export const useAddBookmarkMutation = (userId: string) => {
  const queryClient = useQueryClient();
  const toastId = TOAST_MESSAGE.MUSIC.ADD_TOAST_ID;

  return useMutation({
    mutationFn: addBookmarkedPlaylists,

    onSuccess: () => {
      if (!toast.isActive(toastId)) {
        toast.success(TOAST_MESSAGE.MUSIC.ADD_BOOKMARK_SUCCESS, {
          toastId, // 중복 방지용 ID
        });
      }

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.BOOKMARKED_PLAYLISTS, userId],
      });
    },

    onError: () => {
      toast.error(TOAST_MESSAGE.MUSIC.ADD_BOOKMARK_ERROR);
    },
  });
};

// 북마크 삭제 뮤테이션 훅
export const useRemoveBookmarkMutation = ({
  musicPlaylistId,
  userId,
}: BookmarkedProps) => {
  const queryClient = useQueryClient();
  const toastId = TOAST_MESSAGE.MUSIC.REMOVE_TOAST_ID;

  return useMutation<void, Error, BookmarkedProps>({
    mutationFn: () => removeBookmarkedPlaylists(musicPlaylistId, userId),

    onSuccess: () => {
      if (!toast.isActive(toastId)) {
        toast.success(TOAST_MESSAGE.MUSIC.REMOVE_BOOKMARK_SUCCESS, {
          toastId, // 중복 방지용 ID
        });
      }

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.BOOKMARKED_PLAYLISTS, userId],
      });
    },

    onError: () => {
      toast.error(TOAST_MESSAGE.MUSIC.REMOVE_BOOKMARK_ERROR);
    },
  });
};
