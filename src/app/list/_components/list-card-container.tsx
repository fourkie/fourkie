"use client";

import { COOKIE_ALERT } from "@/constants/cookie-alert.constant";
import { useGetFriendPostsQuery } from "@/hooks/queries/use-get-friend-posts-query";
import { useInfiniteUserPostsByMonth } from "@/hooks/queries/use-infinite-user-posts-by-month-query";
import { useTabStore } from "@/hooks/zustand/list-tab-store";
import { usePostStore } from "@/hooks/zustand/post-date-store";
import { Posts } from "@/types/posts.type";
import EmptyAlert from "@/ui/common/empty-alert.common";
import Tab from "@/ui/common/tab.common";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ListCard from "./list-card";

const ListCardContainer = ({ userId }: { userId: string }) => {
  const { selectedTab } = useTabStore();
  const selectedDay = usePostStore((state) => state.selectedDate);
  const selectedRef = useRef<HTMLDivElement | null>(null);

  const { data: posts } = useGetFriendPostsQuery({ userId });
  const selectedDate = selectedDay ? new Date(selectedDay) : new Date();

  //그 달의 게시물만 가져와야 함
  const {
    data,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetching,
  } = useInfiniteUserPostsByMonth(userId, selectedDate);

  const myPosts = data?.pages.flatMap((page) => page.data) ?? [];

  const [activeTab, setActiveTab] = useState(selectedTab);

  const sortedMyPosts = myPosts
    .slice()
    .sort(
      (a, b) =>
        new Date(b.post_created_at).getTime() -
        new Date(a.post_created_at).getTime(),
    );

  useEffect(() => {
    if (selectedRef.current) {
      selectedRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
  
      // 아래 끝 > 이전 달 로드
      if (
        scrollTop + clientHeight >= scrollHeight - 10 &&
        hasPreviousPage &&
        !isFetching
      ) {
        fetchPreviousPage();
      }
  
      // 위 끝 > 다음 달 로드
      if (scrollTop <= 10 && hasNextPage && !isFetching) {
        fetchNextPage();
      }
    };
  
    window.addEventListener("scroll", handleScroll);
  
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasPreviousPage, hasNextPage, isFetching]);

  const latestPostsByFriend =
    posts?.reduce(
      (acc: Record<string, Posts>, post: Posts) => {
        const authorId = post.user_id;

        if (
          !acc[authorId] ||
          new Date(post.post_created_at) >
            new Date(acc[authorId].post_created_at)
        ) {
          acc[authorId] = post;
        }

        return acc;
      },
      {} as Record<string, Posts>,
    ) ?? {};

  const recentFriendPosts = (Object.values(latestPostsByFriend) as Posts[])
    .slice()
    .sort(
      (a, b) =>
        new Date(b.post_created_at).getTime() -
        new Date(a.post_created_at).getTime(),
    );

  return (
    <div className="relative flex h-full flex-col gap-4 ">
      <div className="fixed left-0 top-[52px] z-10 w-full bg-primary-50 pt-5 md:top-[70px] md:pt-10">
        <Tab
          firstTab="나의 기록"
          secondTab="친구 기록"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
      <div className="flex flex-col gap-5 pt-12 md:pt-[60px]">
        {activeTab === "firstTab" ? (
          sortedMyPosts && sortedMyPosts.length > 0 ? (
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
          ) : (
            <EmptyAlert text={COOKIE_ALERT.LIST.EMPTY_MY} />
          )
        ) : recentFriendPosts && recentFriendPosts.length > 0 ? (
          recentFriendPosts?.map((post, index) => {
            return (
              <motion.div
                key={post.post_id}
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
            );
          })
        ) : (
          <EmptyAlert text={COOKIE_ALERT.LIST.EMPTY_FRIEND} />
        )}
      </div>
    </div>
  );
};

export default ListCardContainer;
