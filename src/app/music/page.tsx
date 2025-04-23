"use client";

import { Emotion } from "@/constants/spotify.constant";
import { TOAST_MESSAGE } from "@/constants/toast-message.constant";
import { useGetAllPlaylistsByQueryQuery } from "@/hooks/queries/use-get-all-playlists-by-query-query";
import { useGetPostTodayEmotionByIdQuery } from "@/hooks/queries/use-get-posts-today-emotion-by-id-query";
import createClient from "@/services/supabase-client-service";
import Image from "next/image";
import { useEffect, useState } from "react";
import EmotionSelect from "./_components/emotion-select";
import PlaylistTabContainer from "./_components/playlist-tab-container";
import { PlaylistTabProps } from "./type";

const Music = () => {
  const [isSelectedTab, setIsSelectedTab] = useState<PlaylistTabProps>(
    PlaylistTabProps.RECOMMEND,
  );

  const [userId, setUserId] = useState<string>("");

  const [emotion, setEmotion] = useState<keyof typeof Emotion>("JOY");
  const emotionQuery = Emotion[emotion];
  const { playlists } = useGetAllPlaylistsByQueryQuery(emotionQuery);
  const imageUrl = playlists[0]?.images[0]?.url;

  const { data: todayEmotionData } = useGetPostTodayEmotionByIdQuery(userId);

  const supabaseClient = createClient();

  // 유저 정보 조회
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabaseClient.auth.getUser();
      const userId = data.user?.id;

      if (userId) {
        setUserId(userId);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const initialEmotion = todayEmotionData?.[0]?.post_emotion;
    if (initialEmotion) {
      setEmotion(initialEmotion);
    }
  }, [todayEmotionData]);

  if (!userId)
    return (
      TOAST_MESSAGE.MUSIC.PLAYLISTS_PENDING ||
      TOAST_MESSAGE.MUSIC.PLAYLISTS_ERROR
    );

  return (
    <div className="relative">
      <div className="fixed left-1/2 top-0 z-50 h-64 min-w-[393px] -translate-x-1/2 transform lg:min-w-full">
        <Image src={imageUrl} alt={imageUrl} fill className="object-cover" />
        <div className="absolute left-0 top-0 h-64 w-full bg-black bg-opacity-60" />
        <EmotionSelect
          emotion={emotion}
          onChange={setEmotion}
          todayEmotion={todayEmotionData?.[0]?.post_emotion}
        />
      </div>
      <div className="absolute left-0 top-[302px] w-full pb-24">
        <PlaylistTabContainer
          userId={userId}
          emotion={emotion}
          activeTab={isSelectedTab}
          onTabChange={setIsSelectedTab}
        />
      </div>
    </div>
  );
};
export default Music;
