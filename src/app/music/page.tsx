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

  const [emotion, setEmotion] = useState<Emotion>(Emotion.JOY);
  const { playlists } = useGetAllPlaylistsByQueryQuery(emotion);
  const imageUrl = playlists[0]?.images[0]?.url;

  const { data: todayEmotion } = useGetPostTodayEmotionByIdQuery(userId);

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
    const initialEmotion = todayEmotion?.[0]?.post_emotion;
    if (initialEmotion) {
      setEmotion(initialEmotion);
    }
  }, [todayEmotion]);

  if (!userId)
    return (
      TOAST_MESSAGE.MUSIC.PLAYLISTS_PENDING ||
      TOAST_MESSAGE.MUSIC.PLAYLISTS_ERROR
    );

  return (
    <div className="pb-24">
      <div style={{ position: "relative", width: "100%", height: "256px" }}>
        <Image
          src={imageUrl}
          alt="imageUrl"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="absolute inset-0 h-64 bg-black bg-opacity-80  w-[393px] left-1/2 -translate-x-1/2 lg:w-full " />
      <EmotionSelect
        emotion={emotion}
        onChange={setEmotion}
        todayEmotion={todayEmotion?.[0]?.post_emotion}
      />
      <PlaylistTabContainer
        userId={userId}
        emotion={emotion}
        activeTab={isSelectedTab}
        onTabChange={setIsSelectedTab}
      />
    </div>
  );
};
export default Music;
