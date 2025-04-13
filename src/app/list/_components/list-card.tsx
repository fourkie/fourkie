"use client";

import { useGetUserByIdQuery } from "@/hooks/queries/use-get-user-by-id-query";
import { Posts } from "@/types/posts.type";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import EmotionGraph from "@/ui/common/emotion-graph";

const ListCard = ({ post, isMyPost }: { post: Posts; isMyPost: boolean }) => {
  const { post_title, post_content, user_id, post_created_at, post_emotion } =
    post;
  const { data: user } = useGetUserByIdQuery(user_id);

  const [isExpanded, setIsExpanded] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);

  const date = post_created_at.split("T")[0];

  return (
    <div className="flex flex-col items-center p-3 gap-3 bg-white text-black px-5 py-4 rounded-xl">
      <div className="flex w-full justify-between">
        <div className="font-bold w-[100px]">{date}</div>
        <div className="font-bold text-center">{post_emotion}</div>
        {isMyPost ? (
          <div className="w-[100px]"></div>
        ) : (
          <div
            className="w-[100px] text-right cursor-pointer"
            onClick={() => setOpenPopup(!openPopup)}
          >
            프로필 보러가기
          </div>
        )}
        {openPopup && (
          <EmotionGraph
            openPopup={openPopup}
            setOpenPopup={() => setOpenPopup(!openPopup)}
            userId={user_id}
          />
        )}
      </div>
      <div className="w-[100px] h-[100px] bg-gray-200">쿠키 이미지</div>
      {!isMyPost && <div className="font-bold">{user?.user_nickname}</div>}
      <div className="font-bold">{post_title}</div>
      {isMyPost && (
        <div
          className={`font-bold w-full break-words text-center ${
            isExpanded ? "line-clamp-none" : "line-clamp-2"
          }`}
        >
          {post_content}
        </div>
      )}
      {isMyPost && (
        <div onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? <ChevronUp /> : <ChevronDown />}
        </div>
      )}
    </div>
  );
};

export default ListCard;
