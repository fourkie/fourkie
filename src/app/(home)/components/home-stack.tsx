"use client";

import { COOKIE_ALERT } from "@/constants/cookie-alert.constant";
import { useGetAllPostsByIdQuery } from "@/hooks/queries/use-get-my-posts-query";
import CookieAlert from "@/ui/common/cookie-alert.common";
import EmotionImage from "@/ui/common/emotion-image.common";
import { checkEmotion } from "@/utils/home-emotion.util";
import { motion } from "framer-motion";

const common =
  " grid grid-cols-5 gap-3 border-2 border-dashed border-primary-200 rounded-[28px] p-4 ";

const HomeStack = ({ userId }: { userId: string }) => {
  const { data: myPosts, isPending } = useGetAllPostsByIdQuery({ userId });
  if (isPending || myPosts == undefined) {
    return <div className={`${common}`}>로딩 중이예요!</div>;
  }

  if (myPosts.length === 0) {
    return (
      <div className="flex h-[200px] items-center justify-center rounded-xl border-2 border-dashed border-primary-200">
        <CookieAlert text={COOKIE_ALERT.LIST.EMPTY_MY} isContent={true} />
      </div>
    );
  }

  const posts = [...myPosts].reverse();

  return (
    <div className={`${common}`}>
      {posts?.length > 20
        ? posts.slice(0, 20).map((post) => {
            return (
              <div key={post.post_id}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: Math.random() * 0.3, // 0~0.3초 사이 랜덤
                  }}
                >
                  <EmotionImage
                    src={checkEmotion(post.post_emotion)}
                    size={"xss"}
                  />
                </motion.div>
              </div>
            );
          })
        : posts.map((post) => {
            return (
              <div key={post.post_id}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: Math.random() * 0.3, // 0~0.3초 사이 랜덤
                  }}
                >
                  <EmotionImage
                    src={checkEmotion(post.post_emotion)}
                    size={"xss"}
                  />
                </motion.div>
              </div>
            );
          })}
    </div>
  );
};

export default HomeStack;
