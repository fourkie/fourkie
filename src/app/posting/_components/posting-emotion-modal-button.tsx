import { useCreatePostsMutation } from "@/hooks/mutations/use-create-posts-mutation";
import { useUpdatePostsByPostIdMutation } from "@/hooks/mutations/use-update-posts-by-postId-mutation";
import { usePostingStore } from "@/hooks/zustand/posting-store";
import Button from "@/ui/common/button.common";
import { useRef } from "react";
import { PostingEmotionModalButtonProps } from "../type";

const PostingEmotionModalButton = ({
  userId,
  currentEmotion,
  postId,
  onClose,
}: PostingEmotionModalButtonProps) => {
  const isSave = useRef(false);

  const title = usePostingStore((state) => state.inputTitle);
  const content = usePostingStore((state) => state.inputContent);

  // mutation 함수
  const { mutate: createPostsMutate, isPending: createPostsPending } =
    useCreatePostsMutation();
  const { mutate: updatePostMutate, isPending: UpdatePostsPending } =
    useUpdatePostsByPostIdMutation({ postId });

  // 버튼 클릭 시 게시글 저장
  const handleSave = () => {
    if (isSave.current) return;
    isSave.current = true;

    if (postId) {
      updatePostMutate({ postId, title, content, currentEmotion });
    } else {
      createPostsMutate({ userId, title, content, currentEmotion });
    }
  };

  return (
    <div className="flex gap-[15px] text-lg">
      <Button onClick={onClose} aria-label="취소">
        <strong>취소</strong>
      </Button>

      <Button
        backgroundColor="sub"
        onClick={handleSave}
        disabled={createPostsPending || UpdatePostsPending}
        aria-label={
          createPostsPending || UpdatePostsPending ? "저장 중..." : "확인"
        }
        aria-disabled={createPostsPending || UpdatePostsPending}
      >
        {createPostsPending || UpdatePostsPending ? "저장 중..." : "확인"}
      </Button>
    </div>
  );
};

export default PostingEmotionModalButton;
