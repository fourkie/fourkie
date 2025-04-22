"use client";

import { useGetFriendPostsQuery } from "@/hooks/queries/use-get-friend-posts-query";
import { useGetAllPostsByIdQuery } from "@/hooks/queries/use-get-my-posts-query";
import { useTabStore } from "@/hooks/zustand/list-tab-store";
import { usePostStore } from "@/hooks/zustand/post-date-store";
import { useEffect, useRef, useState } from "react";
import ListCard from "./list-card";

const ListCardContainer = ({ userId }: { userId: string }) => {
  const {selectedTab} = useTabStore();
  const [isMyPost, setIsMyPost] = useState(selectedTab === 'my');
  const selectedDay = usePostStore((state) => state.selectedDate);
  const selectedRef = useRef<HTMLDivElement | null>(null);

  const { data: posts } = useGetFriendPostsQuery({ userId });
  
  //그 달의 게시물만 가져와야 함
  const { data: myPosts } = useGetAllPostsByIdQuery({ userId,  });

const sortedMyPosts = myPosts
?.slice()
.sort((a, b) => new Date(a.post_created_at).getTime() - new Date(b.post_created_at).getTime());

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
    <div className="flex relative h-full min-h-screen flex-col gap-4 bg-primary-50 px-5 pb-32 pt-24">
      <div className="fixed left-0 top-12 flex w-full items-center justify-center gap-4 bg-primary-50 py-5">
        <div
          className={`${
            isMyPost
              ? "border-b-2 border-primary-600 text-primary-600"
              : "text-gray-400"
          } cursor-pointer font-bold`}
          onClick={() => setIsMyPost(true)}
        >
          내 기록 보기
        </div>
        <div
          className={`${
            isMyPost
              ? "text-gray-400"
              : "border-b-2 border-primary-600 text-primary-600"
          } cursor-pointer font-bold`}
          onClick={() => setIsMyPost(false)}
        >
          친구 기록 보기
        </div>
      </div>
      <div className="mt-8 flex flex-col gap-5">
        {isMyPost
          ? sortedMyPosts?.map((post) => {
            const postDate = post.post_created_at.slice(0, 10);
            const isSelected = postDate === selectedDay;

              return (
                <div key={post.post_id} ref={isSelected ? selectedRef : null}>
                  <ListCard post={post} isMyPost={isMyPost} />
                </div>
              );
            })
          : friendPostsForToday?.map((post) => {
              return (
                <ListCard key={post.post_id} post={post} isMyPost={isMyPost} />
              );
            })}
      </div>
    </div>
  );
};

export default ListCardContainer;
