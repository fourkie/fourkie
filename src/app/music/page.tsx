"use client";
import { Emotion } from "@/constants/spotify.constant";
import { TOAST_MESSAGE } from "@/constants/toast-message.constant";
import { useGetAllPlaylistsByQueryQuery } from "@/hooks/queries/use-get-all-playlists-by-query-query";
import createClient from "@/services/supabase-client-service";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import EmotionSelect from "./_components/emotion-select";
import PlaylistTabContainer from "./_components/playlist-tab-container";
import { PlaylistTabProps } from "./type";

const Music = () => {
  const [emotion, setEmotion] = useState(Emotion.JOY);
  const [isSelectedTab, setIsSelectedTab] = useState<PlaylistTabProps>(
    PlaylistTabProps.RECOMMEND,
  );
  const [userId, setUserId] = useState<string | null>(null);

  const { playlists } = useGetAllPlaylistsByQueryQuery(emotion);
  const imageUrl = playlists[0]?.images[0]?.url;

  console.log("imageUrl", imageUrl);

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
      <div className="flex gap-4">
        <div style={{ position: "relative", width: "100%", height: "208px" }}>
          <Image
            src={imageUrl}
            alt="imageUrl"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-80 z-10 h-52" />
        <EmotionSelect value={emotion} onChange={setEmotion} />
      </div>

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
