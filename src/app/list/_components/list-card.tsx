"use client";

import { ALERT_MESSAGE } from "@/constants/alert-message";
import { EMOTIONS_QUERY } from "@/constants/emotion.constant";
import { useRemovePostMutation } from "@/hooks/mutations/use-remove-post-mutation";
import { useGetUserByIdQuery } from "@/hooks/queries/use-get-user-by-id-query";
import { Posts } from "@/types/posts.type";
import Alert from "@/ui/common/alert.common";
import Button from "@/ui/common/button.common";
import EmotionGraph from "@/ui/common/emotion-graph.common";
import EmotionImage from "@/ui/common/emotion-image.common";
import Popup from "@/ui/common/popup-bg.common";
import { checkEmotion } from "@/utils/home-emotion.util";
import { ChevronDown, ChevronUp, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

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
  const { mutate: removePost } = useRemovePostMutation({
    postId: post_id,
    userId: user_id,
  });
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const [openGraphPopup, setOpenGraphPopup] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const contentEl = contentRef.current;
    if (!contentEl) return;

    const lineHeight = parseFloat(getComputedStyle(contentEl).lineHeight);
    const maxHeight = lineHeight * 2;

    if (contentEl.scrollHeight > maxHeight) {
      setIsOverflowing(true);
    } else {
      setIsOverflowing(false);
    }
  }, [post_content]);

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
    <div className="mx-auto flex w-full max-w-[624px] flex-col items-center gap-3 rounded-2xl bg-white p-3 font-omyu tracking-wide text-black text-grey-8">
      <div className="mb-[2px] flex h-6 w-full items-center justify-between">
        <strong className="w-24 text-sm text-grey-5">{date}</strong>
        <strong className="text-center">{EMOTIONS_QUERY[post_emotion]}</strong>
        {isMyPost ? (
          <div className="flex w-24 justify-end gap-2">
            <Pencil size={18} className="cursor-pointer" onClick={handleEdit} />
            <Trash2
              size={18}
              className="cursor-pointer"
              onClick={handleDeleteButton}
            />
          </div>
        ) : (
          <div
            className="w-24 cursor-pointer text-right font-pretendard text-sm text-primary-600"
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
          오늘 &nbsp;
          <span className="text-secondary-500">{user?.user_nickname}</span>
          &nbsp; 님! <br /> {EMOTIONS_QUERY[post_emotion]}
          &nbsp; 날이시네요!
        </strong>
      )}
      {isMyPost && (
        <>
          <strong className="text-xl">{post_title}</strong>
          <strong
            ref={contentRef}
            className={`w-full max-w-96 break-all px-12 text-center leading-5 ${
              isExpanded ? "line-clamp-none" : "line-clamp-2"
            }`}
          >
            {post_content}
          </strong>
        </>
      )}

      {isMyPost && isOverflowing && (
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="mx-auto w-fit cursor-pointer"
        >
          {isExpanded ? (
            <ChevronUp size={18} className="text-grey-6" />
          ) : (
            <ChevronDown size={18} className="text-grey-6" />
          )}
        </div>
      )}
      {openDeletePopup && (
        <Alert title={ALERT_MESSAGE.LIST.DELETE_TITLE} contents={ALERT_MESSAGE.LIST.DELETE_CONTENT}>
          <Button type="button" onClick={() => setOpenDeletePopup(false)}>
            취소
          </Button>

          <Button
            type="button"
            backgroundColor="sub"
            onClick={() => handleDelete()}
          >
            확인
          </Button>
        </Alert>
      )}
    </div>
  );
};

export default ListCard;
