import { PostingEmotionModalButtonProps } from "../type";

const PostingEmotionModalButton = ({
  onClose,
}: PostingEmotionModalButtonProps) => (
  <div className="flex gap-3 font-bold text-lg">
    <button
      className="flex-1 py-2 px-4 bg-primary-500 rounded-2xl text-white"
      onClick={onClose}
    >
      취소
    </button>

    <button className="flex-1 py-2 px-4 bg-primary-200 rounded-2xl text-black">
      확인
    </button>
  </div>
);

export default PostingEmotionModalButton;
