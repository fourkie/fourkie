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
  const [userId, setUserId] = useState<string>("");
  const [emotion, setEmotion] = useState<keyof typeof Emotion>("JOY");
  const [isScrolled, setIsScrolled] = useState(false);

  const router = useRouter();
  const supabaseClient = createClient();

  const emotionQuery = Emotion[emotion];
  const { playlists } = useGetAllPlaylistsByQueryQuery(emotionQuery);
  const { data: todayEmotionData } = useGetPostTodayEmotionByIdQuery(userId);
  const imageUrl = playlists[0]?.images[0]?.url;

  // 유저 정보 조회
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabaseClient.auth.getUser();

      if (error || !user) {
        router.replace("/sign-in");
      }

      if (user?.id) {
        setUserId(user.id);
      }
    };

    fetchUser();
  }, []);

  // 오늘 감정 초기 세팅
  useEffect(() => {
    const initialEmotion = todayEmotionData?.[0]?.post_emotion;
    if (initialEmotion) {
      setEmotion(initialEmotion);
    }
  }, [todayEmotionData]);

  // 스크롤 감지

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

  if (!userId) {
    return (
      TOAST_MESSAGE.MUSIC.PLAYLISTS_PENDING ||
      TOAST_MESSAGE.MUSIC.PLAYLISTS_ERROR
    );
  }

  return (
    <>
      <div
        className={`sticky top-0 z-30 mx-auto w-full min-w-[360px] max-w-5xl transition-all duration-300 lg:pt-14 ${
          isScrolled ? "h-48" : "h-72"
        }`}
      >
        <div className="relative h-full min-w-[360px]">
          <Image
            src={imageUrl}
            alt={imageUrl}
            fill
            priority
            className="object-cover"
          />
          <div className="relative h-full bg-black/60">
            <EmotionSelect
              emotion={emotion}
              onChange={setEmotion}
              todayEmotion={todayEmotionData?.[0]?.post_emotion}
              isScrolled={isScrolled}
            />
          </div>
        </div>
      </div>
      {/* 탭 영역 */}
      <div
        className={`sticky z-20 w-full bg-white px-5 transition-all duration-300 ${
          isScrolled ? "top-48" : "top-72"
        }`}
      >
        <Tab
          firstTab="추천 플리"
          secondTab="즐겨찾기"
          activeTab={isSelectedTab}
          setActiveTab={setIsSelectedTab}
        />
      </div>
      {/* 콘텐츠 영역 */}
      <div className="px-5">
        <PlaylistContent
          userId={userId}
          activeTab={isSelectedTab}
          emotion={emotion}
        />
      </div>
      {/* 추가 콘텐츠가 있으면 여기 이어서 */}
    </>
  );
};

export default Music;
