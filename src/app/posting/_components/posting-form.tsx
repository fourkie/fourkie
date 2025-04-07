"use client";

import { TOAST_MESSAGE } from "@/constants/toast-message";
import { FORM_MESSAGE } from "@/constants/form-message";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { PostingFormValues } from "../type";
import { usePostEmotionMutation } from "@/hooks/mutations/use-post-emotion-mutation";

const PostingForm = () => {
  const { register, handleSubmit } = useForm<PostingFormValues>();

  const { mutate, data: emotions, isPending } = usePostEmotionMutation();

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

      <h1 className="mt-4 font-bold">감정 분석 결과</h1>
      {emotions ? (
        <>
          <ul className="bg-gray-100 p-4 rounded mt-2 text-sm list-disc list-inside">
            {emotions.map((label: string, index: number) => (
              <li key={index}>{label}</li>
            ))}
          </ul>
          <p> 선택된 감정에 따른 플레이 리스트를 추천해드려요</p>
        </>
      ) : (
        <p className="text-gray-500 mt-2">
          {isPending && "ai가 ㅇㅇ님의 기분을 분석중이에요 조금만 기다려주세오"}
        </p>
      )}
    </div>
  );
};

export default PostingForm;
