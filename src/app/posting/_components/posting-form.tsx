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

const PostingForm = ({ postId, userId }: UserDateProps) => {
  const inputTitle = usePostingStore((state) => state.inputTitle);
  const inputContent = usePostingStore((state) => state.inputContent);
  const setInputTitle = usePostingStore((state) => state.setInputTitle);
  const setInputContent = usePostingStore((state) => state.setInputContent);

  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const [isContentFocused, setIsContentFocused] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const { mutate, data, isPending } =
    useGetAnalyzedPostEmotionMutation(setIsModalOpen);

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
    mutate(inputContent);
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

  return (
    <>
      <form
        id="posting"
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-10"
      >
        {/* Title */}
        <div className="relative flex flex-col gap-2">
          <strong className="text-center text-xl text-grey-5">Title</strong>
          <textarea
            {...register("inputTitle")}
            maxLength={20}
            placeholder={isTitleFocused ? "" : `${FORM_MESSAGE.POST.TITLE}`}
            className="h-5 w-full resize-none text-center font-omyu text-lg leading-4 text-grey-8 placeholder-grey-3 focus:outline-none"
            onFocus={() => setIsTitleFocused(true)}
            onBlur={() => setIsTitleFocused(false)}
          />
        </div>

        {/* Content */}
        <div className="relative flex flex-col gap-2">
          <strong className="text-center text-xl text-grey-5">Content</strong>
          <textarea
            {...register("inputContent")}
            maxLength={1000}
            placeholder={isContentFocused ? "" : `${FORM_MESSAGE.POST.CONTENT}`}
            className="h-5 w-full resize-none text-center font-omyu text-lg leading-4 text-grey-8 placeholder-grey-3 focus:outline-none"
            onFocus={() => setIsContentFocused(true)}
            onBlur={() => setIsContentFocused(false)}
          />
        </div>
      </form>

      {/* 감정 분석 모달 */}
      <PostingEmotionModal
        userId={userId}
        emotion={data}
        postId={postId}
        isPending={isPending}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};

export default PostingForm;
