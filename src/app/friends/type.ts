import { Dispatch, SetStateAction } from "react";

export interface FriendSearchInputProps {
  searchKeyword: string;
  setSearchKeyword: Dispatch<SetStateAction<string>>;
}

export type FriendListProps = {
  searchUser: string;
};
