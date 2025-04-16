import { TOAST_MESSAGE } from "@/constants/toast-message.constant";
import createClient from "./supabase-client-service";
import { SpotifyPlaylistItem } from "@/app/music/type";

// 유저의 북마크된 플레이리스트 조회
export const fetchBookmarkedPlaylists = async (userId: string | null) => {
  const supabaseClient = createClient();

  console.log("북마크 목록 조회 시작 : ", userId);

  const { data: bookmarkedData, error: bookmarkedError } = await supabaseClient
    .from("musics")
    .select("music_playlist_id") // 음악 아이디
    .eq("user_id", userId);

  if (bookmarkedError) {
    console.error("bookmarkedError : ", bookmarkedError);
    throw new Error(TOAST_MESSAGE.SPOTIFY.BOOKMARK_ERROR);
  }

  console.log("조회된 북마크 목록 : ", bookmarkedData);

  return bookmarkedData.map((item) => item.music_playlist_id);
};

// 특정 플레이리스트를 북마크에 추가
export const addBookmarkedPlaylists = async ({
  id: music_playlist_id,
  userId,
  name,
  external_urls,
  images,
  tracks,
  uri,
}: SpotifyPlaylistItem) => {
  const supabaseClient = createClient();

  const { error } = await supabaseClient.from("musics").insert([
    {
      music_playlist_id,
      user_id: userId,
      name,
      external_urls,
      images,
      tracks,
      uri,
    },
  ]);

  if (error) {
    throw new Error(TOAST_MESSAGE.SPOTIFY.ADD_BOOKMARK_ERROR);
  }
};

// 특정 플레이리스트를 북마크에서 제거
export const removeBookmarkedPlaylists = async (
  musicPlaylistId: string,
  userId: string,
) => {
  const supabaseClient = createClient();

  console.log("🗑️ [removeBookmarkedPlaylists] 북마크 제거 시도:", {
    musicPlaylistId,
    userId,
  });

  const { error } = await supabaseClient
    .from("musics")
    .delete()
    .eq("music_playlist_id", musicPlaylistId)
    .eq("user_id", userId);

  if (error) {
    console.error("❌ [removeBookmarkedPlaylists] 북마크 제거 실패:", error);
    throw new Error(TOAST_MESSAGE.SPOTIFY.REMOVE_BOOKMARK_ERROR);
  }

  console.log(
    "✅ [removeBookmarkedPlaylists] 북마크 제거 성공:",
    musicPlaylistId,
  );
};
