import { useUpdatePostsByPostIdMutation } from "@/hooks/mutations/use-update-posts-by-postId-mutation";
import { PostingEmotionModalButtonProps } from "../type";
import { useCreatePostsMutation } from "@/hooks/mutations/use-create-posts-mutation";

const PostingEmotionModalButton = ({
  userId,
  title,
  content,
  currentEmotion,
  postId,
  onClose,
}: PostingEmotionModalButtonProps) => {
  const { mutate: createPostsMutate, isPending: createPostsPending } =
    useCreatePostsMutation();
  const { mutate: updatePostMutate, isPending: UpdatePostsPending } =
    useUpdatePostsByPostIdMutation();

  // 버튼 클릭 시 게시글 저장
  const handleSave = () => {
    if (postId) {
      updatePostMutate({ postId, title, content, currentEmotion });
    } else {
      createPostsMutate({ userId, title, content, currentEmotion });
    }
  };

  return (
    <div className="flex gap-3 font-bold text-lg">
      <button
        className="flex-1 py-2 px-4 bg-primary-500 rounded-2xl text-white"
        onClick={onClose}
      >
        취소
      </button>

      <button
        className="flex-1 py-2 px-4 bg-primary-200 rounded-2xl text-black"
        onClick={handleSave}
      >
        {createPostsPending || UpdatePostsPending ? "저장 중..." : "확인"}
      </button>
    </div>
  );
};

export default PostingEmotionModalButton;
