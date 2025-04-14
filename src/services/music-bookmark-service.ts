import { useEffect, useState } from "react";
import createClient from "./supabase-client-service";

export const useBookmarks = (userId?: string) => {
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!userId) {
      console.log("로그인 되어 있지 않음");
      return;
    }

    const supabase = createClient();

    const fetchBookmarks = async () => {
      const { data, error } = await supabase
        .from("musics")
        .select("music_playlist_id")
        .eq("user_id", userId);

      if (error) {
        console.log("북마크 데이터 로드 실패", error);
        return;
      }

      if (data) {
        const newBookmarkedIds = new Set(
          data.map((item) => item.music_playlist_id),
        );
        setBookmarkedIds(newBookmarkedIds);
      }
    };

    fetchBookmarks();
  }, [userId]); // userId가 변경될 때만 호출

  console.log("userId", userId);

  const toggleBookmark = async (playlistId: string) => {
    if (!userId) return;

    const supabase = createClient();

    const isBookmarked = bookmarkedIds.has(playlistId);

    if (isBookmarked) {
      // 이미 북마크 -> 삭제
      await supabase
        .from("musics")
        .delete()
        .eq("user_id", userId)
        .eq("music_playlist_id", playlistId);

      setBookmarkedIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(playlistId);
        return newSet;
      });
    } else {
      // 북마크 추가
      await supabase.from("musics").insert({
        user_id: userId,
        music_playlist_id: playlistId,
      });

      setBookmarkedIds((prev) => {
        const newSet = new Set(prev);
        newSet.add(playlistId);
        return newSet;
      });
    }
  };

  return {
    bookmarkedIds,
    toggleBookmark,
  };
};
