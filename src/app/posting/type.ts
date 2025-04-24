export type PostingResponse = {
  label: string;
  score: number;
};

export type PostingFormValues = {
  inputTitle: string;
  inputContent: string;
};

export type UserDateProps = {
  postId?: string;
  userId: string;
};

export type PostingResultModalProps = {
  userId: string;
  emotion: string;
  postId?: string;
  isPending: boolean;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type PostingEmotionModalSlideProps = {
  currentEmotionKey: string;
  emotionKeys: string[];
  setSlideIndex: React.Dispatch<React.SetStateAction<number>>;
};

export type PostingEmotionModalButtonProps = {
  userId: string;
  currentEmotion: string;
  postId?: string;
  onClose: () => void;
};

export type CreatePostsParams = {
  userId: string;
  title: string;
  content: string;
  currentEmotion: string;
};

export type updatePostsByPostIdParams = {
  postId?: string;
  title: string;
  content: string;
  currentEmotion: string;
};
