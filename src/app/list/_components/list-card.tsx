"use client";

import { EMOTIONS_QUERY } from "@/constants/emotion.constant";
import { useRemovePostMutation } from "@/hooks/mutations/use-remove-post-mutation";
import { useGetUserByIdQuery } from "@/hooks/queries/use-get-user-by-id-query";
import { Posts } from "@/types/posts.type";
import EmotionGraph from "@/ui/common/emotion-graph";
import EmotionImage from "@/ui/common/emotion-image.common";
import Popup from "@/ui/common/popup";
import { checkEmotion } from "@/utils/home-emotion.util";
import { ChevronDown, ChevronUp, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
  const [isOverflowing, setIsOverflowing] = useState(false);
  console.log("🚀 ~ ListCard ~ setIsOverflowing:", setIsOverflowing);

  const date = post_created_at.split("T")[0];

  const handleDelete = () => {
    removePost();
  };

  const handleEdit = () => {
    router.push(`/posting/${post_id}`);
  };

  return (
    <div className="flex flex-col items-center gap-4 rounded-xl bg-white p-3 px-5 py-4 font-ownglyph leading-4p text-black">
      <div className="flex w-full items-center justify-between">
        <div className="w-[80px] text-sm font-bold">{date}</div>
        <div className="text-center font-bold">
          {EMOTIONS_QUERY[post_emotion]}
        </div>
        {isMyPost ? (
          <div className="flex w-[80px] justify-end gap-3">
            <Pencil className="w-5 cursor-pointer" onClick={handleEdit} />
            <Trash2 className="w-5 cursor-pointer" onClick={handleDelete} />
          </div>
        ) : (
          <div
            className="w-[80px] cursor-pointer text-right font-pretendard text-xs"
            onClick={() => setOpenPopup(!openPopup)}
          >
            프로필 보러가기
          </div>
        )}
        {openPopup && (
          <Popup>
            <EmotionGraph
              page="list"
              openPopup={openPopup}
              setOpenPopup={() => setOpenPopup(!openPopup)}
              userId={user_id}
              nickname={user?.user_nickname}
            />
          </Popup>
        )}
      </div>
      <EmotionImage src={checkEmotion(post_emotion)} size="l" />
      {!isMyPost && (
        <div className="text-center font-ownglyph font-bold leading-4p">
          오늘
          <span className="font-ownglyph leading-4p text-secondary-200">
            {user?.user_nickname}
          </span>
          님! <br /> {EMOTIONS_QUERY[post_emotion]}
          날이시네요!
        </div>
      )}
      {isMyPost && (
        <div className="flex flex-col items-center">
          <div className="text-xl font-bold">{post_title}</div>
          <div
            className={`w-full break-all text-center text-lg font-bold ${
              isExpanded ? "line-clamp-none" : "line-clamp-2"
            }`}
          >
            {post_content}
          </div>
        </div>
      )}

      {isMyPost && isOverflowing && (
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="mx-auto mt-1 w-fit cursor-pointer"
        >
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      )}
    </div>
  );
};

export default ListCard;
