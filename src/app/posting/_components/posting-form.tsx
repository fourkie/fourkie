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

  // query, mutation 함수
  const { mutate, data, isPending } =
    useGetAnalyzedPostEmotionMutation(setIsModalOpen);
  const { data: postData } = useGetPostsByPostIdQuery({ postId });

  // react-hook-form을 사용하여 폼 상태 관리
  const { register, handleSubmit, watch, setValue } =
    useForm<PostingFormValues>();
  const inputTitle = watch("inputTitle");
  const inputContent = watch("inputContent");

  const router = useRouter();

  // 감정 분석 결과를 처리하는 함수
  const onSubmit = ({ inputTitle, inputContent }: PostingFormValues) => {
    if (!inputTitle.trim() || !inputContent.trim()) return;
    mutate(inputContent);
  };

  // 게시글 수정 시 내가 작성한 게시글인지 확인
  useEffect(() => {
    if (!postId || !postData || !postData[0]) return;

    const isOwner = postData[0].user_id === userId;
    if (isOwner) {
      setValue("inputTitle", postData[0].post_title);
      setValue("inputContent", postData[0].post_content);
    } else {
      router.push("/");
    }
  }, [postData, userId, setValue, router]);

  // textarea 높이 자동 조절 함수
  const handleAutoResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target;
    target.style.height = "auto";
    target.style.height = `${target.scrollHeight}px`;
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 px-5 pt-2.5"
      >
        <div className="relative flex flex-col gap-2">
          <h2 className="text-center text-xl font-bold text-grey-4">Title</h2>

          {!inputTitle && !isTitleFocused && (
            <div className="pointer-events-none absolute left-0 top-9 w-full text-center font-ownglyph text-xl leading-4p text-grey-2">
              {FORM_MESSAGE.POST.TITLE}
            </div>
          )}

          <textarea
            {...register("inputTitle")}
            maxLength={20}
            className="w-full resize-none overflow-hidden whitespace-normal bg-transparent text-center font-ownglyph text-xl leading-4p text-black focus:outline-none"
            onFocus={() => setIsTitleFocused(true)}
            onBlur={() => setIsTitleFocused(false)}
            onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              handleAutoResize(e)
            }
          />
        </div>

        <div className="relative flex flex-col gap-2">
          <h2 className="text-center text-xl font-bold text-grey-4">Content</h2>

          {!inputContent && !isContentFocused && (
            <div className="pointer-events-none absolute left-0 top-9 w-full text-center font-ownglyph text-xl leading-4p text-grey-2">
              {FORM_MESSAGE.POST.CONTENT}
            </div>
          )}

          <textarea
            {...register("inputContent")}
            maxLength={1000}
            className="w-full resize-none overflow-hidden whitespace-pre-line bg-transparent text-center font-ownglyph text-xl leading-4p text-black focus:outline-none"
            onFocus={() => setIsContentFocused(true)}
            onBlur={() => setIsContentFocused(false)}
            onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              handleAutoResize(e)
            }
          />
        </div>

        <button
          type="submit"
          className="absolute right-5 top-3.5 z-50 rounded-lg bg-primary-700 px-2 py-1 text-sm font-medium text-secondary-50"
        >
          {isPending ? "처리 중..." : "게시"}
        </button>
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
    </div>
  );
};

export default PostingForm;
