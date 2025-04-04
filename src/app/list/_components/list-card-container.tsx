"use client";

import { useGetAllPostsQuery } from "@/hooks/queries/use-get-all-posts-query";
import ListCard from "./list-card";

const ListCardContainer = () => {
  const { data: posts } = useGetAllPostsQuery();
  const now = new Date().toISOString();
  const postsForToday = posts?.filter((post) => {
    return post.post_created_at.includes(now.slice(0, 10));
  });

  return (
    <div className="flex flex-col gap-4 px-5">
      <div className="w-full text-right">나도 감정 기록하러 가기</div>
      <div className="flex flex-col gap-4">
        {postsForToday?.map((post) => {
          return <ListCard key={post.post_id} post={post} />;
        })}
      </div>
    </div>
  );
};

export default ListCardContainer;
