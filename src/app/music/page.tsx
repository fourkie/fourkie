"use client";

import { Emotion } from "@/constants/spotify.constant";
import { TOAST_MESSAGE } from "@/constants/toast-message.constant";
import { useGetAllPlaylistsByQueryQuery } from "@/hooks/queries/use-get-all-playlists-by-query-query";
import { useGetPostTodayEmotionByIdQuery } from "@/hooks/queries/use-get-posts-today-emotion-by-id-query";
import createClient from "@/services/supabase-client-service";
import Tab from "@/ui/common/tab.common";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import EmotionSelect from "./_components/emotion-select";
import PlaylistContent from "./_components/playlist-content";

const Music = () => {
  const [isSelectedTab, setIsSelectedTab] = useState("firstTab");
  const router = useRouter();

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
      const {
        data: { user },
        error,
      } = await supabaseClient.auth.getUser();
      const userId = user?.id;
      if (error || !user) {
        router.replace("/sign-in");
      }

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

  //

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //

  if (!userId)
    return (
      TOAST_MESSAGE.MUSIC.PLAYLISTS_PENDING ||
      TOAST_MESSAGE.MUSIC.PLAYLISTS_ERROR
    );

  return (
    <div className="relative mx-auto min-w-[360px] max-w-5xl">
      {/* 상단 이미지 영역 */}
      <div
        className="sticky top-0 z-30 w-full max-w-5xl transition-all duration-300"
        style={{
          height: isScrolled ? 144 : 256, // 스크롤 전: 256, 스크롤 후: 144
        }}
      >
        <div className="relative h-full min-w-[360px]">
          <Image src={imageUrl} alt={imageUrl} fill className="object-cover" />
          <div className="absolute inset-0 bg-black/60 px-5">
            <EmotionSelect
              emotion={emotion}
              onChange={setEmotion}
              todayEmotion={todayEmotionData?.[0]?.post_emotion}
            />
          </div>
        </div>
      </div>
      <div className="sticky top-[144px] z-20 w-full bg-white px-5">
        {/* scrolledImageHeight가 줄어들면 top 값도 조정해야 함. */}
        <Tab
          firstTab="추천 플리"
          secondTab="즐겨찾기"
          activeTab={isSelectedTab}
          setActiveTab={setIsSelectedTab}
        />
      </div>

      {/* 아래 스크롤되는 컨텐츠 */}
      <div className="px-5">
        <PlaylistContent
          userId={userId}
          activeTab={isSelectedTab}
          emotion={emotion}
        />
      </div>
      {/* 추가 콘텐츠가 있으면 여기 이어서 */}
    </div>
  );
};
export default Music;
