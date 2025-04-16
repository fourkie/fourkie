"use client";

import { Emotion } from "@/constants/spotify.constant";
import { TOAST_MESSAGE } from "@/constants/toast-message.constant";
import { useGetAllPlaylistsByQueryQuery } from "@/hooks/queries/use-get-all-playlists-by-query-query";
import createClient from "@/services/supabase-client-service";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import EmotionSelect from "./_components/emotion-select";
import PlaylistCard from "./_components/playlist-card";
import PlaylistTabContainer from "./_components/playlist-tab-container";
import { PlaylistTabProps } from "./type";

const Music = () => {
  const [isSelectedTab, setIsSelectedTab] = useState<PlaylistTabProps>(
    PlaylistTabProps.RECOMMEND,
  );
  const [query, setQuery] = useState(Emotion.JOY);
  const [userId, setUserId] = useState<string | null>(null);
  const [bookmarks, setBookmarks] = useState<{ [key: string]: boolean }>({});

  const supabaseClient = createClient();

  // 유저 정보 조회
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabaseClient.auth.getUser();
      const userId = data.user?.id;

      console.log("유저 정보 : ", userId); // 확인 완료

      if (!userId) {
        toast.error(TOAST_MESSAGE.SPOTIFY.USER_ERROR);
        return;
      }

      setUserId(userId);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchBookmarks = async () => {
      if (!userId || !playlists.length) return;

      const bookmarked = await getBookmarkedPlaylistsByUser(userId);
      const bookmarkMap = bookmarked.reduce((acc, id) => {
        acc[id] = true;
        return acc;
      }, {} as { [key: string]: boolean });

      setBookmarks(bookmarkMap);
    };

    fetchBookmarks();
  }, [userId]);

  const { playlists, playlistsPending, playlistsError } =
    useGetAllPlaylistsByQueryQuery(query);

  if (playlistsPending || playlistsError || !userId) {
    return <div>{TOAST_MESSAGE.SPOTIFY.ERROR}</div>;
  }

  return (
    <div>
      <EmotionSelect value={query} onChange={setQuery} />

      <PlaylistTabContainer
        userId={userId}
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
                  userId={userId}
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
