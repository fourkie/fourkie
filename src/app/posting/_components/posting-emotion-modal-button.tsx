import { useRouter } from "next/navigation";
import { PostingEmotionModalButtonProps } from "../type";
import { toast } from "react-toastify";
import { useCreatePostMutation } from "@/hooks/mutations/use-create-post-mutation";

const PostingEmotionModalButton = ({
  userId,
  title,
  content,
  currentEmotion,
  onClose,
}: PostingEmotionModalButtonProps) => {
  const router = useRouter();

  const { mutate, isPending } = useCreatePostMutation();

  // 버튼 클릭 시 게시글 저장
  const handleSave = () => {
    mutate(
      { userId, title, content, currentEmotion },
      {
        onSuccess: () => {
          toast.success("게시물이 성공적으로 저장되었습니다!");
          router.push("/music");
        },
        onError: (error) => {
          toast.error("게시물 저장 중 오류가 발생했습니다.");
          console.error(error);
        },
      },
    );
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
        {isPending ? "저장 중..." : "확인"}
      </button>
    </div>
  );
};
export default PostingEmotionModalButton;
