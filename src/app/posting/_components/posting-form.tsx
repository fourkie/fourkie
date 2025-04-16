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

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Title</h2>
        <textarea
          {...register("inputTitle")}
          placeholder={FORM_MESSAGE.POST.TITLE}
          className="border p-2 rounded"
        />

        <h2>Content</h2>
        <textarea
          {...register("inputContent")}
          placeholder={FORM_MESSAGE.POST.CONTENT}
          className="border p-2 rounded"
        />

        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
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
