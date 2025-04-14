export type PostingResponse = {
  label: string;
  score: number;
};

export type PostingFormValues = {
  inputText: string;
};

export type UserDateProps = {
  nickname: string | undefined;
};

export type PostingResultModalProps = {
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
  onClose: () => void;
};
