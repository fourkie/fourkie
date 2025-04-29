"use client";

import { COOKIE_ALERT } from "@/constants/cookie-alert.constant";
import { useGetFriendPostsQuery } from "@/hooks/queries/use-get-friend-posts-query";
import { useGetAllPostsByIdQuery } from "@/hooks/queries/use-get-my-posts-query";
import { useTabStore } from "@/hooks/zustand/list-tab-store";
import { usePostStore } from "@/hooks/zustand/post-date-store";
import CookieAlert from "@/ui/common/cookie-alert.common";
import Tab from "@/ui/common/tab.common";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ListCard from "./list-card";

const ListCardContainer = ({ userId }: { userId: string }) => {
  const { selectedTab } = useTabStore();
  const selectedDay = usePostStore((state) => state.selectedDate);
  const selectedRef = useRef<HTMLDivElement | null>(null);

  const { data: posts } = useGetFriendPostsQuery({ userId });

  //그 달의 게시물만 가져와야 함
  const { data: myPosts } = useGetAllPostsByIdQuery({ userId });

  const [activeTab, setActiveTab] = useState(selectedTab);

  const sortedMyPosts = myPosts
    ?.slice()
    .sort(
      (a, b) =>
        new Date(a.post_created_at).getTime() -
        new Date(b.post_created_at).getTime(),
    );

  useEffect(() => {
    if (selectedRef.current) {
      selectedRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [sortedMyPosts, selectedDay]);

  const now = new Date().toISOString();
  const friendPostsForToday = posts?.filter((post) => {
    return post.post_created_at.includes(now.slice(0, 10));
  });

  return (
    <div className="relative flex h-full flex-col gap-4">
      <div className="fixed left-0 top-[52px] z-10 w-full bg-primary-50 pt-5">
        <Tab
          firstTab="나의 기록"
          secondTab="친구 기록"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
      <div className="flex flex-col gap-5 pt-11">
        {activeTab === "firstTab" ? (
          sortedMyPosts?.map((post, index) => {
            const postDate = post.post_created_at.slice(0, 10);
            const isSelected = postDate === selectedDay;

            return (
              <div key={post.post_id} ref={isSelected ? selectedRef : null}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: index * 0.1 },
                  }}
                  viewport={{ once: true }}
                >
                  <ListCard post={post} isMyPost={activeTab === "firstTab"} />
                </motion.div>
              </div>
            );
          })
        ) : friendPostsForToday!.length >= 1 ? (
          friendPostsForToday?.map((post, index) => {
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: index * 0.1 },
                }}
                viewport={{ once: true }}
              >
                <ListCard
                  key={post.post_id}
                  post={post}
                  isMyPost={activeTab === "firstTab"}
                />
              </motion.div>
            );
          })
        ) : (
          <CookieAlert text={COOKIE_ALERT.LIST.EMPTY_FRIEND} />
        )}
      </div>
    </div>
  );
};

export default ListCardContainer;
