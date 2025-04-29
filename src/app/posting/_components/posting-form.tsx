"use client";

import { FORM_MESSAGE } from "@/constants/form-message.constant";
import { useGetAnalyzedPostEmotionMutation } from "@/hooks/mutations/use-get-analyzed-post-emotion-mutation";
import { useGetPostsByPostIdQuery } from "@/hooks/queries/use-get-posts-by-postId-query";
import { usePostingStore } from "@/hooks/zustand/posting-store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { PostingFormValues, UserDateProps } from "../type";
import PostingEmotionModal from "./posting-emotion-modal";
import PostingEmotionModalLoading from "./posting-emotion-modal-loading";

const PostingForm = ({ postId, userId }: UserDateProps) => {
  const inputTitle = usePostingStore((state) => state.inputTitle);
  const inputContent = usePostingStore((state) => state.inputContent);
  const setInputTitle = usePostingStore((state) => state.setInputTitle);
  const setInputContent = usePostingStore((state) => state.setInputContent);

  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const [isContentFocused, setIsContentFocused] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const {
    mutate: emotionMutate,
    data: emotion,
    isPending: emotionPending,
  } = useGetAnalyzedPostEmotionMutation(setIsModalOpen);

  const { data: postData } = useGetPostsByPostIdQuery({ postId });

  const { register, handleSubmit, watch, setValue } =
    useForm<PostingFormValues>({
      defaultValues: {
        inputTitle,
        inputContent,
      },
    });

  // react-hook-form을 사용하여 폼 상태 관리
  useEffect(() => {
    const subscription = watch((value) => {
      setInputTitle(value.inputTitle || "");
      setInputContent(value.inputContent || "");
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  /** 제목과 내용이 비어있지 않은 경우 감정 분석 API를 호출 */
  const onSubmit = ({ inputTitle, inputContent }: PostingFormValues) => {
    if (!inputTitle.trim() || !inputContent.trim()) return;
    emotionMutate(inputContent);
  };

  // 게시글 수정 시 내가 작성한 게시글인지 확인하고 폼 초기화
  useEffect(() => {
    if (!postId || !postData || !postData[0]) return;

    const isOwner = postData[0].user_id === userId;
    if (isOwner) {
      setValue("inputTitle", postData[0].post_title);
      setValue("inputContent", postData[0].post_content);
    } else {
      router.replace("/");
    }
  }, [postData, userId, setValue, router]);

  // textarea 높이 자동 조절 함수
  useEffect(() => {
    const textarea = document.querySelector(
      "textarea[name='inputContent']",
    ) as HTMLTextAreaElement;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [inputContent]);

  if (emotionPending && !emotion) {
    return <PostingEmotionModalLoading />;
  }

  return (
    <>
      <form
        id="posting"
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto flex w-1/2 flex-col md:gap-5 md:pt-9"
        aria-labelledby="posting-form-title"
      >
        {/* Title */}
        <div className="relative flex flex-col gap-3">
          <strong
            id="posting-form-title"
            className="text-center text-xl text-grey-2 md:text-2xl"
          >
            Title
          </strong>
          <textarea
            {...register("inputTitle")}
            maxLength={25}
            placeholder={isTitleFocused ? "" : `${FORM_MESSAGE.POST.TITLE}`}
            className="h-[44px] w-full resize-none overflow-hidden text-center font-omyu text-xl font-normal leading-5 tracking-wide text-grey-7 placeholder-grey-3 placeholder:text-xl focus:outline-none md:h-[26px] md:text-2xl placeholder:md:text-2xl"
            onFocus={() => setIsTitleFocused(true)}
            onBlur={() => setIsTitleFocused(false)}
            aria-label="Post title"
            aria-describedby="posting-form-title"
          />
        </div>

        {/* Content */}
        <div className="relative flex flex-col gap-2">
          <strong className="text-center text-xl text-grey-2 md:text-2xl">
            Content
          </strong>
          <textarea
            {...register("inputContent")}
            maxLength={512}
            placeholder={isContentFocused ? "" : `${FORM_MESSAGE.POST.CONTENT}`}
            className="h-[17px] w-full resize-none overflow-hidden text-center font-omyu text-base font-normal leading-5 tracking-wide text-grey-7 placeholder-grey-3 focus:outline-none md:h-[22px] placeholder:md:text-xl"
            onFocus={() => setIsContentFocused(true)}
            onBlur={() => setIsContentFocused(false)}
            aria-label="Post content"
            aria-describedby="posting-form-content"
          />
        </div>
      </form>

      {/* 감정 분석 모달 */}
      <PostingEmotionModal
        userId={userId}
        emotion={emotion}
        postId={postId}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};

export default PostingForm;
