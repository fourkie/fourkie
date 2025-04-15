import { TOAST_MESSAGE } from "@/constants/toast-message.constant";
import createClient from "./supabase-client-service";

// 북마크된 플레이리스트 조회
export const fetchBookmarkedPlaylists = async (userId: string) => {
  const supabaseClient = createClient();

  const { data: bookmarkedData, error: bookmarkedError } = await supabaseClient
    .from("musics")
    .select("music_playlist_id")
    .eq("user_id", userId);

  if (bookmarkedError) {
    throw new Error(TOAST_MESSAGE.SPOTIFY.BOOKMARK_ERROR);
  }

  console.log("bookmarkedData : ", bookmarkedData);

  return bookmarkedData;
};

// 북마크 추가
export const addBookmarkedPlaylists = async (
  musicPlaylistId: string,
  userId: string,
) => {
  const supabaseClient = createClient();

  const { error } = await supabaseClient
    .from("musics")
    .insert([{ music_playlist_id: musicPlaylistId, user_id: userId }]);

  if (error) {
    throw new Error(TOAST_MESSAGE.SPOTIFY.ADD_BOOKMARK_ERROR);
  }
};

// 북마크 삭제
export const removeBookmarkedPlaylists = async (
  musicPlaylistId: string,
  userId: string,
) => {
  const supabaseClient = createClient();

  const { error } = await supabaseClient
    .from("musics")
    .delete()
    .eq("music_playlist_id", musicPlaylistId)
    .eq("user_id", userId);

  if (error) {
    throw new Error(TOAST_MESSAGE.SPOTIFY.REMOVE_BOOKMARK_ERROR);
  }
};
