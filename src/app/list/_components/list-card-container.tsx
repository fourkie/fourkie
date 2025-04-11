"use client";

import ListCard from "./list-card";
import { useState } from "react";
import { useGetFriendPostsQuery } from "@/hooks/queries/use-get-friend-posts-query";
import { useGetAllPostsByIdQuery } from "@/hooks/queries/use-get-my-posts-query";

const ListCardContainer = ({ userId }: { userId: string }) => {
  const [isMyPost, setIsMyPost] = useState(true);

  const { data: posts } = useGetFriendPostsQuery({ userId });
  const { data: myPosts } = useGetAllPostsByIdQuery({ userId });

  const now = new Date().toISOString();
  const friendPostsForToday = posts?.filter((post) => {
    return post.post_created_at.includes(now.slice(0, 10));
  });

  return (
    <div className="flex flex-col gap-4 px-5 bg-primary-50">
      <div className="flex items-center gap-4">
        <div
          className={`${
            isMyPost ? "text-black" : "text-gray-400"
          } cursor-pointer font-bold`}
          onClick={() => setIsMyPost(true)}
        >
          내 기록 보기
        </div>
        <div
          className={`${
            isMyPost ? "text-gray-400" : "text-black"
          } cursor-pointer font-bold`}
          onClick={() => setIsMyPost(false)}
        >
          친구 기록 보기
        </div>
      </div>
      <div className="flex flex-col gap-5">
        {isMyPost
          ? myPosts?.map((post) => {
              return <ListCard key={post.post_id} post={post} isMyPost={isMyPost} />;
            })
          : friendPostsForToday?.map((post) => {
              return <ListCard key={post.post_id} post={post} isMyPost={isMyPost}/>;
            })}
      </div>
    </div>
  );
};

export default ListCardContainer;
