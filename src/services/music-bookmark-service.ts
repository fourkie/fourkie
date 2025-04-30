import { SpotifyPlaylistItem } from "@/app/music/type";
import { TOAST_MESSAGE } from "@/constants/toast-message.constant";
import createClient from "./supabase-client-service";

export const fetchBookmarkedPlaylists = async (userId: string | null) => {
  const supabaseClient = createClient();

  const { data: bookmarkedData, error: bookmarkedError } = await supabaseClient
    .from("musics")
    .select("music_playlist_id")
    .eq("user_id", userId);

  if (bookmarkedError) {
    throw new Error(TOAST_MESSAGE.MUSIC.BOOKMARK_ERROR);
  }

  const bookmarkedPlaylistIds = bookmarkedData.map(
    (Playlist) => Playlist.music_playlist_id,
  );

  const { data: bookmarkedPlaylistsData, error: bookmarkedPlaylistsError } =
    await supabaseClient
      .from("musics")
      .select("*")
      .eq("user_id", userId)
      .in("music_playlist_id", bookmarkedPlaylistIds);

  if (bookmarkedPlaylistsError) {
    throw new Error(TOAST_MESSAGE.MUSIC.PLAYLISTS_ERROR);
  }

  return bookmarkedPlaylistsData;
};

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
  } catch {
    throw new Error("북마크를 추가하는 동안 문제가 발생했습니다.");
  }
};

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
  } catch {
    throw new Error("북마크를 제거하는 동안 문제가 발생했습니다.");
  }
};
