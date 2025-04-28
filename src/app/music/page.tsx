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
  const [userId, setUserId] = useState<string>("");
  const [emotion, setEmotion] = useState<keyof typeof Emotion>("JOY");
  const [isSelectedTab, setIsSelectedTab] = useState("firstTab");
  const [isScrolled, setIsScrolled] = useState(false);

  const { data: todayEmotionData } = useGetPostTodayEmotionByIdQuery(userId);

  const emotionQuery = Emotion[emotion];
  const { playlists } = useGetAllPlaylistsByQueryQuery(emotionQuery);
  const imageUrl = playlists[0]?.images[0]?.url;

  const supabaseClient = createClient();
  const router = useRouter();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

  if (!userId)
    return (
      TOAST_MESSAGE.MUSIC.PLAYLISTS_PENDING ||
      TOAST_MESSAGE.MUSIC.PLAYLISTS_ERROR
    );

  return (
    <div className="relative mx-auto min-w-[360px] max-w-5xl">
      {/* 플레이리스트 이미지 영역 */}
      <section
        className="sticky top-0 z-30 w-full max-w-5xl transition-all duration-300 md:top-14"
        style={{
          height: isScrolled ? 156 : 256, // 스크롤 전 : 256, 스크롤 후 : 156
        }}
      >
        <div className="relative h-full min-w-[360px]">
          <Image src={imageUrl} alt={imageUrl} fill className="object-cover" />
          <div className="absolute inset-0 bg-black/60">
            <EmotionSelect
              emotion={emotion}
              onChange={setEmotion}
              todayEmotion={todayEmotionData?.[0]?.post_emotion}
              scrolled={isScrolled}
            />
          </div>
        </div>
      </section>

      {/* isScrolled 값에 따라 top 값 조정 필수 !! */}
      <div
        className="sticky top-[156px] z-20 w-full bg-white px-5 md:top-[212px]"
        style={{
          top: isScrolled ? (isMobile ? 156 : 212) : isMobile ? 256 : 312,
        }}
      >
        <Tab
          firstTab="추천 플리"
          secondTab="즐겨찾기"
          activeTab={isSelectedTab}
          setActiveTab={setIsSelectedTab}
        />
      </div>
      <div
        style={{
          height: isScrolled ? (isMobile ? 0 : 48) : isMobile ? 0 : 48,
        }}
      />
      {/* 스크롤 되는 PlaylistContent */}
      <PlaylistContent
        userId={userId}
        activeTab={isSelectedTab}
        emotion={emotion}
      />
    </div>
  );
};
export default Music;
