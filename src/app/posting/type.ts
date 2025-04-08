export type PostingResponse = {
  label: string;
  score: number;
};

export type PostingFormValues = {
  inputText: string;
};

export type PostingResultModalProps = {
  emotions: string[] | undefined;
  isPending: boolean;
};
