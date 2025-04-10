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
};
