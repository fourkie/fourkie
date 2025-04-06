"use client";

import { useGetUserByIdQuery } from "@/hooks/queries/use-get-user-by-id-query";
import { Posts } from "@/types/posts.types";

const ListCard = ({ post }: { post: Posts }) => {
  const { post_title, user_id } = post;
  const { data: user } = useGetUserByIdQuery(user_id);

  return (
    <div className="flex gap-3 h-14 bg-white text-black px-5 py-4 rounded-xl">
      <div className="font-bold">{user.user_nickname}</div>
      <div className="font-bold">{post_title}</div>
    </div>
  );
};

export default ListCard;
