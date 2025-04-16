"use client";

import { FORM_MESSAGE } from "@/constants/form-message.constant";
import { useForm } from "react-hook-form";
import { PostingFormValues, UserDateProps } from "../type";
import { useGetAnalyzedPostEmotionMutation } from "@/hooks/mutations/use-get-analyzed-post-emotion-mutation";
import PostingEmotionModal from "./posting-emotion-modal";
import { useState, useEffect } from "react";
import { useGetPostsByPostIdQuery } from "@/hooks/queries/use-get-posts-by-postId-query";
import { useRouter } from "next/navigation";

const PostingForm = ({ postId, userId, nickname }: UserDateProps) => {
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
        className="flex flex-col px-5 pt-2.5 gap-5"
      >
        <div className="flex flex-col gap-2">
          <h2 className="text-center text-xl font-bold text-grey-4">Title</h2>

          <textarea
            {...register("inputTitle")}
            placeholder={FORM_MESSAGE.POST.TITLE}
            maxLength={20}
            className={`w-full text-xl text-center resize-none overflow-hidden whitespace-normal focus:outline-none font-ownglyph leading-4p ${
              inputTitle ? "text-black" : "text-grey-2"
            }`}
            onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              handleAutoResize(e)
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-center text-xl font-bold text-grey-4">Content</h2>

          <textarea
            {...register("inputContent")}
            placeholder={FORM_MESSAGE.POST.CONTENT}
            className={`w-full text-lg text-center resize-none overflow-hidden whitespace-pre-line focus:outline-none font-ownglyph leading-4p ${
              inputContent ? "text-black" : "text-grey-2"
            }`}
            onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              handleAutoResize(e)
            }
          />
        </div>

        <button
          type="submit"
          className="absolute top-3.5 right-5 px-2 py-1 bg-primary-700 text-secondary-50 rounded-lg font-medium text-sm z-50"
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
        nickname={nickname}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default PostingForm;
