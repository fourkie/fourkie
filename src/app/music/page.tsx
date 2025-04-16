"use client";

import { useEffect, useState } from "react";

import { useGetAllPlaylistsByQueryQuery } from "@/hooks/queries/use-get-all-playlists-by-query-query";
import EmotionSelect from "./_components/emotion-select";
import { TabButtons } from "./_components/tab-buttons";
import { PlaylistList } from "./_components/playlist-list";
import { Emotion } from "@/constants/spotify.constant";
import { useBookmarks } from "@/services/music-bookmark-service";
import createClient from "@/services/supabase-client-service";
import { QUERYDATA } from "@/constants/query-data.constant";
import { TOAST_MESSAGE } from "@/constants/toast-message.constant";

const Music = () => {
  const [isTab, setIsTab] = useState<"recommend" | "bookmark">("recommend");
  const [query, setQuery] = useState(Emotion.JOY);
  const [user, setUser] = useState<any>(null);

  const supabaseClient = createClient();

  useEffect(() => {
    // 유저 정보 가져오기
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabaseClient.auth.getUser();
      setUser(user);
    };

    fetchUser();
  }, []);

  const { playlists, playlistsPending } = useGetAllPlaylistsByQueryQuery(query);

  // userId가 유효할 때만 북마크 훅 호출
  const { bookmarkedIds, toggleBookmark } = useBookmarks(user?.id);

  if (playlistsPending) return QUERYDATA.ISPENDING;

  // 유저 정보가 없을 경우
  if (!user) return TOAST_MESSAGE.SPOTIFY.ERROR;

  const filteredPlaylists =
    isTab === "bookmark"
      ? playlists.filter((p) => bookmarkedIds.has(p.id))
      : playlists;

  return (
    <div>
      <div className="mt-4">
        <TabButtons isTab={isTab} onTabChange={setIsTab} />
      </div>

      <div className="mb-4">
        <EmotionSelect value={query} onChange={setQuery} />
      </div>

      <PlaylistList
        playlists={filteredPlaylists}
        bookmarkedPlaylistIds={bookmarkedIds}
        onToggleBookmark={toggleBookmark}
        isTab={isTab}
      />
    </div>
  );
};

export default Music;
