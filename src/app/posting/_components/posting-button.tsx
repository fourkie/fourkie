"use client";

import { usePostingStore } from "@/hooks/zustand/posting-store";

const PostingButton = ({ className }: { className?: string }) => {
  const inputTitle = usePostingStore((state) => state.inputTitle);
  const inputContent = usePostingStore((state) => state.inputContent);

  return (
    <button
      form="posting"
      type="submit"
      className={`${className} ${inputTitle && inputContent ? "text-primary-500" : "text-grey-3"}`}
    >
      <strong className="h-7 p-0.5">완료</strong>
    </button>
  );
};

export default PostingButton;
