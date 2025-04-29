"use client";

import { usePostingStore } from "@/hooks/zustand/posting-store";

const PostingButton = ({ className }: { className?: string }) => {
  const inputTitle = usePostingStore((state) => state.inputTitle);
  const inputContent = usePostingStore((state) => state.inputContent);

  const isDisabled = !(inputTitle && inputContent);

  return (
    <button
      form="posting"
      type="submit"
      className={`${className} ${!isDisabled ? "text-primary-500" : "text-grey-3"}`}
      aria-label={
        isDisabled ? "게시글 작성 완료 (비활성화)" : "게시글 작성 완료"
      }
      aria-disabled={isDisabled}
      disabled={isDisabled}
    >
      <strong className="p-0.5 text-base">완료</strong>
    </button>
  );
};

export default PostingButton;
