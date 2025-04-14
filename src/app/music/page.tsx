"use client";

import { useEffect, useState } from "react";

import { useGetAllPlaylistsByQueryQuery } from "@/hooks/queries/use-get-all-playlists-by-query-query";
import EmotionSelect from "./_components/emotion-select";
import { TabButtons } from "./_components/tab-buttons";
import { PlaylistList } from "./_components/playlist-list";
import { Emotion } from "@/constants/spotify.constant";
import { useBookmarks } from "@/services/music-bookmark-service";
import createClient from "@/services/supabase-client-service";

const Music = () => {
  const [isTab, setIsTab] = useState<"recommend" | "bookmark">("recommend");
  const [query, setQuery] = useState(Emotion.JOY);
  const [user, setUser] = useState<any>(null); // 유저 상태 관리

  const supabase = createClient();

  useEffect(() => {
    // getUser()를 호출하여 유저 정보 가져오기
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user); // 유저 상태에 저장
    };

    fetchUser();
  }, []); // 컴포넌트가 마운트될 때 한 번만 호출

  const { playlists, playlistsPending } = useGetAllPlaylistsByQueryQuery(query);

  console.log("playlists : ", playlists);
  // userId가 유효할 때만 북마크 훅 호출
  const { bookmarkedIds, toggleBookmark } = useBookmarks(user?.id);

  if (playlistsPending) return <div>로딩 중...</div>;

  // 유저 정보가 없으면 로딩 화면 또는 로그인 화면으로 전환
  if (!user) return <div>로그인되어 있지 않습니다.</div>;

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
