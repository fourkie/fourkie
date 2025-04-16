"use client";
import { Emotion } from "@/constants/spotify.constant";
import { TOAST_MESSAGE } from "@/constants/toast-message.constant";
import createClient from "@/services/supabase-client-service";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import EmotionSelect from "./_components/emotion-select";
import PlaylistTabContainer from "./_components/playlist-tab-container";
import { PlaylistTabProps } from "./type";

const Music = () => {
  // 감정 상태 관리
  const [emotion, setEmotion] = useState(Emotion.JOY);
  const [isSelectedTab, setIsSelectedTab] = useState<PlaylistTabProps>(
    PlaylistTabProps.RECOMMEND,
  );
  const [userId, setUserId] = useState<string | null>(null);

  const supabaseClient = createClient();

  // 유저 정보 조회
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabaseClient.auth.getUser();
      const userId = data.user?.id;

      if (!userId) {
        toast.error(TOAST_MESSAGE.MUSIC.USER_ERROR);
        return;
      }

      setUserId(userId);
    };

    fetchUser();
  }, []);

  if (!userId) return TOAST_MESSAGE.MUSIC.USER_ERROR;

  return (
    <div>
      <EmotionSelect value={emotion} onChange={setEmotion} />

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
