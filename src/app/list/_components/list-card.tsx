"use client";

import { useGetUserByIdQuery } from "@/hooks/queries/use-get-user-by-id-query";
import { Posts } from "@/types/posts.type";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import EmotionGraph from "@/ui/common/emotion-graph";
import { useRemovePostMutation } from "@/hooks/mutations/use-remove-post-mutation";
import { useRouter } from "next/navigation";
import { EMOTIONS_QUERY } from "@/constants/emotion.constant";
import EmotionImage from "@/ui/common/emotion-image.common";
import EMOTION_COOKIE_IMAGE_URL from "@/constants/emotions-url.constant";

const ListCard = ({ post, isMyPost }: { post: Posts; isMyPost: boolean }) => {
  const {
    post_id,
    post_title,
    post_content,
    user_id,
    post_created_at,
    post_emotion,
  } = post;
  const { data: user } = useGetUserByIdQuery(user_id);
  const { mutate: removePost } = useRemovePostMutation({ postId: post_id });
  const router = useRouter();

  const [isExpanded, setIsExpanded] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);

  const date = post_created_at.split("T")[0];

  const handleDelete = () => {
    removePost();
  };

  const handleEdit = () => {
    router.push(`/posting/${post_id}`);
  };

  return (
    <div className="flex flex-col items-center p-3 gap-3 bg-white text-black px-5 py-4 rounded-xl">
      <div className="flex w-full justify-between">
        <div className="font-bold w-[100px]">{date}</div>
        <div className="font-bold text-center">
          {EMOTIONS_QUERY[post_emotion]}
        </div>
        {isMyPost ? (
          <>
            <div className="cursor-pointer" onClick={handleDelete}>
              삭제
            </div>
            <div className="cursor-pointer" onClick={handleEdit}>
              수정
            </div>
          </>
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
      <EmotionImage src={EMOTION_COOKIE_IMAGE_URL[post_emotion]} size="l" />
      {!isMyPost && (
        <div className="font-bold text-center">
          오늘 <span className="text-secondary-200">{user?.user_nickname}</span>
          님! <br /> {EMOTIONS_QUERY[post_emotion]}
          기분이시네요!
        </div>
      )}
      {isMyPost && (
        <>
          <div className="font-bold">{post_title}</div>
          <div
            className={`font-bold w-full break-words text-center ${
              isExpanded ? "line-clamp-none" : "line-clamp-2"
            }`}
          >
            {post_content}
          </div>
        </>
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
