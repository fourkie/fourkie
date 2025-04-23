import { useCreatePostsMutation } from "@/hooks/mutations/use-create-posts-mutation";
import { useUpdatePostsByPostIdMutation } from "@/hooks/mutations/use-update-posts-by-postId-mutation";
import { PostingEmotionModalButtonProps } from "../type";

const PostingEmotionModalButton = ({
  userId,
  title,
  content,
  currentEmotion,
  postId,
  onClose,
}: PostingEmotionModalButtonProps) => {
  // mutation 함수
  const { mutate: createPostsMutate, isPending: createPostsPending } =
    useCreatePostsMutation();
  const { mutate: updatePostMutate, isPending: UpdatePostsPending } =
    useUpdatePostsByPostIdMutation();

  // 버튼 클릭 시 게시글 저장
  const handleSave = () => {
    if (postId) {
      updatePostMutate(
        { postId, title, content, currentEmotion },
        {
          onSuccess: onClose,
        },
      );
    } else {
      createPostsMutate(
        { userId, title, content, currentEmotion },
        {
          onSuccess: onClose,
        },
      );
    }
  };

  return (
    <div className="flex gap-4 text-lg font-bold">
      <button
        className="flex-1 rounded-2xl bg-primary-500 py-2 text-grey-0"
        onClick={onClose}
      >
        취소
      </button>

      <button
        className="flex-1 rounded-2xl bg-primary-200 py-2 text-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={handleSave}
        disabled={createPostsPending || UpdatePostsPending}
      >
        {createPostsPending || UpdatePostsPending ? "저장 중..." : "확인"}
      </button>
    </div>
  );
};

export default PostingEmotionModalButton;
