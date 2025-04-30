"use client";

import { Emotion } from "@/constants/spotify.constant";
import { useGetAllPlaylistsByQueryQuery } from "@/hooks/queries/use-get-all-playlists-by-query-query";
import { useGetPostTodayEmotionByIdQuery } from "@/hooks/queries/use-get-posts-today-emotion-by-id-query";
import createClient from "@/services/supabase-client-service";
import Tab from "@/ui/common/tab.common";
import { motion } from "framer-motion";
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
      if (window.scrollY > 64) {
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

  return (
    <div className="relative mx-auto min-w-[360px]">
      <section className="fixed top-0 z-30 h-[256px] w-full max-w-[984px] transition-all duration-300 md:top-[70px] md:mx-auto md:h-[287px]">
        <div
          className="relative h-full min-w-[360px] bg-white bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrl})` }}
        >
          <div className="absolute inset-0 bg-black/60">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <EmotionSelect
                emotion={emotion}
                onChange={setEmotion}
                todayEmotion={todayEmotionData?.[0]?.post_emotion}
                scrolled={isScrolled}
              />
            </motion.div>
          </div>
        </div>
      </section>

      <div className="flex-start fixed top-[256px] z-20 mx-auto flex w-full max-w-[984px] bg-white px-5 pb-3 pt-5 md:top-[357px] md:pb-5">
        <Tab
          firstTab="추천 플리"
          secondTab="즐겨찾기"
          activeTab={isSelectedTab}
          setActiveTab={setIsSelectedTab}
          isPink={true}
        />
        <div className="absolute left-0 top-[61px] -z-10 w-full border-b border-b-grey-0 sm:hidden md:block" />
      </div>
      <div className="pt-[334px] md:pt-[443px]">
        <PlaylistContent
          userId={userId}
          activeTab={isSelectedTab}
          emotion={emotion}
        />
      </div>
    </div>
  );
};
export default Music;
