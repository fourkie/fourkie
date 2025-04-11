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
  emotions: string[];
  isPending: boolean;
  nickname: string | undefined;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

// test 타입입니다.
export type Mood = {
  name: string;
  icon: string;
  color: string;
};
