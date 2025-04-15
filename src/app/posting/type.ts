export type PostingResponse = {
  label: string;
  score: number;
};

export type PostingFormValues = {
  inputTitle: string;
  inputContent: string;
};

export type UserDateProps = {
  userId?: string;
  nickname?: string;
};

export type PostingResultModalProps = {
  userId?: string;
  title: string;
  content: string;
  emotion: string;
  isPending: boolean;
  nickname: string | undefined;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type PostingEmotionModalLoadingProps = {
  nickname: string | undefined;
};

export type PostingEmotionModalSlideProps = {
  currentEmotionKey: string;
  emotionKeys: string[];
  setSlideIndex: React.Dispatch<React.SetStateAction<number>>;
};

export type PostingEmotionModalButtonProps = {
  userId?: string;
  title: string;
  content: string;
  currentEmotion: string;
  onClose: () => void;
};

export type CreatePostsParams = {
  userId?: string;
  title: string;
  content: string;
  currentEmotion: string;
};

export type updatePostsByPostIdParams = {
  postId: number;
  title: string;
  content: string;
  currentEmotion: string;
};
