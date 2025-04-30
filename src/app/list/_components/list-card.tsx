"use client";

import { ALERT_MESSAGE } from "@/constants/alert-message";
import { EMOTIONS_QUERY } from "@/constants/emotion.constant";
import { useRemovePostMutation } from "@/hooks/mutations/use-remove-post-mutation";
import { useGetUserByIdQuery } from "@/hooks/queries/use-get-user-by-id-query";
import { Posts } from "@/types/posts.type";
import Alert from "@/ui/common/alert.common";
import EmotionGraph from "@/ui/common/emotion-graph.common";
import EmotionImage from "@/ui/common/emotion-image.common";
import Popup from "@/ui/common/popup-bg.common";
import { checkEmotion } from "@/utils/home-emotion.util";
import { Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Content from "./conetent";

const ListCard = ({
  post,
  isMyPost,
  className,
}: {
  post: Posts;
  isMyPost: boolean;
  className?: string;
}) => {
  const {
    post_id,
    post_title,
    post_content,
    user_id,
    post_created_at,
    post_emotion,
  } = post;
  const { data: user } = useGetUserByIdQuery(user_id);
  const { mutate: removePost } = useRemovePostMutation({
    postId: post_id,
    userId: user_id,
  });
  const router = useRouter();
  const [openGraphPopup, setOpenGraphPopup] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);

  const date = post_created_at.split("T")[0];

  const handleDeleteButton = () => {
    setOpenDeletePopup(true);
  };

  const handleDelete = () => {
    removePost();
    setOpenDeletePopup(false);
  };

  const handleEdit = () => {
    router.push(`/posting/${post_id}`);
  };

  return (
    <div
      className={`mx-auto flex w-full max-w-[624px] flex-col items-center gap-3 rounded-2xl bg-white p-3 font-omyu tracking-wide md:p-4 ${className}`}
    >
      <div className="mb-[2px] flex h-6 w-full items-center justify-between">
        <strong className="w-24 text-sm">{date}</strong>
        <strong className="text-center">{EMOTIONS_QUERY[post_emotion]}</strong>
        {isMyPost ? (
          <div className="flex w-24 justify-end gap-2">
            <Pencil
              size={18}
              className="transform cursor-pointer transition-all duration-300 hover:text-grey-5"
              onClick={handleEdit}
            />
            <Trash2
              size={18}
              className="transform cursor-pointer transition-all duration-300 hover:text-grey-5"
              onClick={handleDeleteButton}
            />
          </div>
        ) : (
          <div
            className="w-24 cursor-pointer text-right font-minsans text-sm text-primary-600 hover:text-primary-550"
            onClick={() => setOpenGraphPopup(!openGraphPopup)}
          >
            프로필 보러가기
          </div>
        )}
        {openGraphPopup && (
          <Popup>
            <EmotionGraph
              isListPage={true}
              openPopup={openGraphPopup}
              setOpenPopup={() => setOpenGraphPopup(!openGraphPopup)}
              userId={user_id}
              nickname={user?.user_nickname}
            />
          </Popup>
        )}
      </div>
      <EmotionImage src={checkEmotion(post_emotion)} size="l" />
      {!isMyPost && (
        <strong className="text-center leading-5">
          <span className="text-secondary-500">{user?.user_nickname}</span>
          &nbsp; 님은 최근 <br /> {EMOTIONS_QUERY[post_emotion]}
          &nbsp; 하루를 보냈어요!
        </strong>
      )}
      {isMyPost && (
        <Content post_title={post_title} post_content={post_content} />
      )}
      {openDeletePopup && (
        <Alert
          title={ALERT_MESSAGE.LIST.DELETE_TITLE}
          contents={ALERT_MESSAGE.LIST.DELETE_CONTENT}
          setOpenPopup={setOpenDeletePopup}
          confirm={handleDelete}
        />
      )}
    </div>
  );
};

export default ListCard;
