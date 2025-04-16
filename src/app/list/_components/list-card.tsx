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

  const date = post_created_at.split("T")[0];

  const handleDelete = () => {
    removePost();
  };

  const handleEdit = () => {
    router.push(`/posting/${post_id}`);
  };

  return (
    <div className="flex flex-col items-center p-3 gap-4 bg-white text-black px-5 py-4 rounded-xl font-ownglyph leading-4p">
      <div className="flex w-full justify-between items-center">
        <div className="font-bold w-[80px] text-sm">{date}</div>
        <div className="font-bold text-center">
          {EMOTIONS_QUERY[post_emotion]}
        </div>
        {isMyPost ? (
          <div className="flex gap-3 w-[80px] justify-end">
            <Pencil className="w-5 cursor-pointer" onClick={handleEdit} />
            <Trash2 className="w-5 cursor-pointer" onClick={handleDelete} />
          </div>
        ) : (
          <div
            className="w-[80px] text-right cursor-pointer text-xs font-pretendard"
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
        <div className="font-bold text-center font-ownglyph leading-4p">
          오늘
          <span className="text-secondary-200 font-ownglyph leading-4p">
            {user?.user_nickname}
          </span>
          님! <br /> {EMOTIONS_QUERY[post_emotion]}
          날이시네요!
        </div>
      )}
      {isMyPost && (
        <div className="flex flex-col items-center">
          <div className="font-bold text-xl">{post_title}</div>
          <div
            className={`font-bold w-full break-all text-center text-lg ${
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
          className="cursor-pointer w-fit mx-auto mt-1"
        >
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      )}
    </div>
  );
};

export default ListCard;
