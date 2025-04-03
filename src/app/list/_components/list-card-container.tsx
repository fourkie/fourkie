"use client";

import { useGetAllPostsQuery } from "@/hooks/queries/use-get-all-posts-query";
import ListCard from "./list-card";

const ListCardContainer = () => {
  const { data: posts } = useGetAllPostsQuery();

  return (
    <div>
      {posts?.map((post) => {
        return <ListCard key={post.post_id} post={post} />;
      })}
    </div>
  );
};

export default ListCardContainer;
