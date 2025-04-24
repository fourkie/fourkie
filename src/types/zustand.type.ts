// 헤더 리렌더링 주스탄드 타입 지정
export interface LoginStore {
  loginStateKey: number;
  updateLoginStateKey: () => void;
}

export type PostingState = {
  inputTitle: string;
  inputContent: string;
  setInputTitle: (value: string) => void;
  setInputContent: (value: string) => void;
};
