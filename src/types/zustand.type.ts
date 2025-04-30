export interface LoginStore {
  loginStateKey: number;
  updateLoginStateKey: () => void;
}

export type PostingState = {
  inputTitle: string;
  inputContent: string;
  setInputTitle: (value: string) => void;
  setInputContent: (value: string) => void;
  clearInput: () => void;
};
