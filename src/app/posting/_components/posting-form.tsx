"use client";

import { TOAST_MESSAGE } from "@/constants/toast-message";
import { FORM_MESSAGE } from "@/constants/form-message";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { PostingFormValues, UserDateProps } from "../type";
import { useGetAnalyzedPostEmotionMutation } from "@/hooks/mutations/use-post-emotion-mutation";
import PostingResultModal from "./posting-result-modal";

const PostingForm = ({ nickname }: UserDateProps) => {
  const { mutate, data, isPending } = useGetAnalyzedPostEmotionMutation();
  const { register, handleSubmit } = useForm<PostingFormValues>();

  // 감정 분석 결과를 처리하는 함수
  const onSubmit = ({ inputText }: PostingFormValues) => {
    if (!inputText.trim()) return;

    mutate(inputText, {
      onError: () => {
        toast.error(TOAST_MESSAGE.AI.HUGGINGFACE.ERROR);
      },
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register("inputText")}
          placeholder={FORM_MESSAGE.POST.TITLE}
          className="border p-2 rounded"
        />

        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          게시
        </button>
      </form>

      <PostingResultModal
        emotions={data}
        isPending={isPending}
        nickname={nickname}
      />
    </div>
  );
};

export default PostingForm;
