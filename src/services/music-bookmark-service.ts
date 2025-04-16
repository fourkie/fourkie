import { TOAST_MESSAGE } from "@/constants/toast-message.constant";
import createClient from "./supabase-client-service";
import { SpotifyPlaylistItem } from "@/app/music/type";

// 북마크 플레이리스트 조회
export const fetchBookmarkedPlaylists = async (userId: string | null) => {
  const supabaseClient = createClient();

  // 1. 유저의 북마크된 플레이리스트 아이디 조회
  const { data: bookmarkedData, error: bookmarkedError } = await supabaseClient
    .from("musics")
    .select("music_playlist_id")
    .eq("user_id", userId);

  if (bookmarkedError) {
    throw new Error(TOAST_MESSAGE.MUSIC.BOOKMARK_ERROR);
  }

  // 2. music_playlist_id 추출
  const bookmarkedPlaylistIds = bookmarkedData.map(
    (Playlist) => Playlist.music_playlist_id,
  );

  // 3. music_playlist_id를 기반으로 실제 플레이리스트 정보 조회
  const { data: bookmarkedPlaylistsData, error: bookmarkedPlaylistsError } =
    await supabaseClient
      .from("musics")
      .select("*")
      .eq("user_id", userId)
      .in("music_playlist_id", bookmarkedPlaylistIds); // music_playlist_id가 bookmarkedPlaylistIds 테이블의 id와 일치하는 데이터 조회

  if (bookmarkedPlaylistsError) {
    throw new Error(TOAST_MESSAGE.MUSIC.PLAYLISTS_ERROR);
  }

  return bookmarkedPlaylistsData;
};

// 북마크 추가
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

  try {
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
      throw new Error(error.message || "북마크 추가 중 오류가 발생했습니다.");
    }
  } catch (error) {
    console.error("북마크 추가 실패 : ", error);
    throw new Error("북마크를 추가하는 동안 문제가 발생했습니다.");
  }
};

// 북마크 삭제
export const removeBookmarkedPlaylists = async (
  musicPlaylistId: string,
  userId: string,
) => {
  const supabaseClient = createClient();

  try {
    const { error } = await supabaseClient
      .from("musics")
      .delete()
      .eq("music_playlist_id", musicPlaylistId)
      .eq("user_id", userId);

    if (error) {
      throw new Error(error.message || "북마크 삭제 중 오류가 발생했습니다.");
    }

    console.log("북마크 삭제 성공 : ", musicPlaylistId);
  } catch (error) {
    console.error("북마크 삭제 실패 : ", error);
    throw new Error("북마크를 제거하는 동안 문제가 발생했습니다.");
  }
};
