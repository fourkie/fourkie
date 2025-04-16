import { QUERY_KEY } from "@/constants/query-keys.constant";
import { TOAST_MESSAGE } from "@/constants/toast-message.constant";
import {
  addBookmarkedPlaylists,
  removeBookmarkedPlaylists,
} from "@/services/music-bookmark-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

// 북마크 추가 API를 호출하는 뮤테이션 훅
export const useAddBookmarkMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      music_playlist_id,
      name,
      external_urls,
      images,
      tracks,
      uri,
    }: {
      music_playlist_id: string;
      name: string;
      external_urls: { spotify: string };
      images: { url: string }[];
      tracks: { href: string; total: number };
      uri: string;
    }) =>
      addBookmarkedPlaylists({
        id: music_playlist_id,
        name,
        external_urls,
        images,
        tracks,
        uri,
      }),

    onSuccess: () => {
      toast.success(TOAST_MESSAGE.SPOTIFY.ADD_BOOKMARK_SUCCESS);

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.BOOKMARKED_PLAYLISTS],
      });
    },

    onError: () => {
      toast.error(TOAST_MESSAGE.SPOTIFY.ADD_BOOKMARK_ERROR);
    },
  });
};

// 북마크 삭제 API를 호출하는 뮤테이션 훅
export const useRemoveBookmarkMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      music_playlist_id,
      name,
      external_urls,
      images,
      tracks,
      uri,
    }: {
      music_playlist_id: string;
      name: string;
      external_urls: { spotify: string };
      images: { url: string }[];
      tracks: { href: string; total: number };
      uri: string;
    }) =>
      removeBookmarkedPlaylists({
        id: music_playlist_id,
        name,
        external_urls,
        images,
        tracks,
        uri,
      }),

    onSuccess: () => {
      toast.success(TOAST_MESSAGE.SPOTIFY.REMOVE_BOOKMARK_SUCCESS);

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.BOOKMARKED_PLAYLISTS],
      });
    },

    onError: () => {
      toast.error(TOAST_MESSAGE.SPOTIFY.REMOVE_BOOKMARK_ERROR);
    },
  });
};
