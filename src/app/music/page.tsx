"use client";

import { useEffect, useState } from "react";
import { PlaylistTabProps } from "./type";
import { Emotion } from "@/constants/spotify.constant";
import createClient from "@/services/supabase-client-service";
import { useGetAllPlaylistsByQueryQuery } from "@/hooks/queries/use-get-all-playlists-by-query-query";
import { TOAST_MESSAGE } from "@/constants/toast-message.constant";
import {
  addBookmarkedPlaylists,
  removeBookmarkedPlaylists,
} from "@/services/music-bookmark-service";
import EmotionSelect from "./_components/emotion-select";
import PlaylistTabContainer from "./_components/playlist-tab-container";
import PlaylistCard from "./_components/playlist-card";
import { toast } from "react-toastify";

const Music = () => {
  const [isSelectedTab, setIsSelectedTab] = useState<PlaylistTabProps>(
    PlaylistTabProps.RECOMMEND,
  );
  const [query, setQuery] = useState(Emotion.JOY);
  const [user, setUser] = useState(null);
  const [bookmarks, setBookmarks] = useState<{ [key: string]: boolean }>({});

  const supabaseClient = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabaseClient.auth.getUser();
      const userId = data.user?.id;

      console.log("유저 정보 : ", userId);

      if (!userId) {
        toast.error(TOAST_MESSAGE.SPOTIFY.USER_ERROR);
        return;
      }

      setUser(userId);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchBookmarks = async () => {
      if (!user || !playlists.length) return;

      const bookmarked = await getBookmarkedPlaylistsByUser(user);
      const bookmarkMap = bookmarked.reduce((acc, id) => {
        acc[id] = true;
        return acc;
      }, {} as { [key: string]: boolean });

      setBookmarks(bookmarkMap);
    };

    fetchBookmarks();
  }, [user]);

  const { playlists, playlistsPending, playlistsError } =
    useGetAllPlaylistsByQueryQuery(query);

  if (playlistsPending || playlistsError || !user) {
    return <div>{TOAST_MESSAGE.SPOTIFY.ERROR}</div>;
  }

  const handleBookmarkToggle = async (playlistId: string) => {
    const isCurrentlyBookmarked = bookmarks[playlistId];

    // 북마크 상태 변경
    setBookmarks((prev) => ({
      ...prev,
      [playlistId]: !isCurrentlyBookmarked,
    }));

    // 북마크 추가 / 삭제 처리
    try {
      if (isCurrentlyBookmarked) {
        // 현재 북마크 되어 있으면 제거
        await removeBookmarkedPlaylists(playlistId, user);
      } else {
        // 북마크 되어 있지 않으면 추가
        await addBookmarkedPlaylists(playlistId, user);
      }
    } catch (error) {
      console.error("북마크 처리 중 에러 발생:", error);
      // 예외 처리 (예: 사용자에게 오류 메시지 표시)
    }
  };

  return (
    <div>
      <EmotionSelect value={query} onChange={setQuery} />

      <PlaylistTabContainer
        activeTab={isSelectedTab}
        onTabChange={setIsSelectedTab}
      />

      <div className="mt-4">
        {isSelectedTab === PlaylistTabProps.RECOMMEND && (
          <ul className="flex flex-col gap-4">
            {playlists.map((playlist) => {
              const isBookmarked = bookmarks[playlist.id] || false;

              return (
                <PlaylistCard
                  key={playlist.id}
                  playlist={playlist}
                  isBookmarked={isBookmarked}
                  onBookmarkToggle={() => handleBookmarkToggle(playlist.id)}
                />
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Music;
