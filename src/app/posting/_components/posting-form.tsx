"use client";

import { FORM_MESSAGE } from "@/constants/form-message.constant";
import { useGetAnalyzedPostEmotionMutation } from "@/hooks/mutations/use-get-analyzed-post-emotion-mutation";
import { useGetPostsByPostIdQuery } from "@/hooks/queries/use-get-posts-by-postId-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { PostingFormValues, UserDateProps } from "../type";
import PostingEmotionModal from "./posting-emotion-modal";

const PostingForm = ({ postId, userId }: UserDateProps) => {
  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const [isContentFocused, setIsContentFocused] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 감정 분석 API 호출을 위한 mutation
  const { mutate, data, isPending } =
    useGetAnalyzedPostEmotionMutation(setIsModalOpen);

  // 게시글 데이터를 가져오는 query
  const { data: postData } = useGetPostsByPostIdQuery({ postId });

  // react-hook-form을 사용하여 폼 상태 관리
  const { register, handleSubmit, watch, setValue } =
    useForm<PostingFormValues>();
  const inputTitle = watch("inputTitle");
  const inputContent = watch("inputContent");

  const router = useRouter();

  /**
   * 폼 제출 시 호출되는 함수
   * 제목과 내용이 비어있지 않은 경우 감정 분석 API를 호출
   */
  const onSubmit = ({ inputTitle, inputContent }: PostingFormValues) => {
    if (!inputTitle.trim() || !inputContent.trim()) return;
    mutate(inputContent);
  };

  // 게시글 수정 시 내가 작성한 게시글인지 확인하고 폼 초기화
  useEffect(() => {
    if (!postData || !postData[0]) return;

    const isOwner = postData[0].user_id === userId;
    if (isOwner) {
      setValue("inputTitle", postData[0].post_title);
      setValue("inputContent", postData[0].post_content);
    } else {
      router.push("/");
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
        className="flex w-full flex-col gap-5 px-5 pt-2.5"
      >
        <div className="relative flex flex-col gap-2">
          <h2 className="text-center text-xl font-bold text-grey-5">Title</h2>

          {!inputTitle && !isTitleFocused && (
            <div className="pointer-events-none absolute left-0 top-9 w-full text-center font-omyu text-xl leading-4p text-grey-3">
              {FORM_MESSAGE.POST.TITLE}
            </div>
          )}

          <textarea
            {...register("inputTitle")}
            maxLength={20}
            className="w-full resize-none overflow-hidden whitespace-normal bg-transparent text-center font-omyu text-xl leading-4p text-grey-7 focus:outline-none"
            onFocus={() => setIsTitleFocused(true)}
            onBlur={() => setIsTitleFocused(false)}
          />
        </div>

        <div className="relative flex flex-col gap-2">
          <h2 className="text-center text-xl font-bold text-grey-5">Content</h2>

          {!inputContent && !isContentFocused && (
            <div className="pointer-events-none absolute left-0 top-9 w-full text-center font-omyu text-xl leading-4p text-grey-3">
              {FORM_MESSAGE.POST.CONTENT}
            </div>
          )}

          <textarea
            {...register("inputContent")}
            maxLength={1000}
            className="w-full resize-none overflow-hidden whitespace-pre-line bg-transparent text-center font-omyu text-xl leading-4p text-grey-7 focus:outline-none"
            onFocus={() => setIsContentFocused(true)}
            onBlur={() => setIsContentFocused(false)}
          />
        </div>
      </form>

      <PostingEmotionModal
        userId={userId}
        title={inputTitle}
        content={inputContent}
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
