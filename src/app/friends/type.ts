import { Dispatch, SetStateAction } from "react";

export interface FriendSearchInputProps {
  searchKeyword: string;
  setSearchKeyword: Dispatch<SetStateAction<string>>;
}

export type FriendListProps = {
  searchUser: string;
  setSelectedUser: (user: SelectedUserType) => void;
};

export type SelectedUserType = {
  user_uid: string;
  user_nickname: string;
  user_email: string;
};

export interface FriendRequestPopUpProps {
  user: SelectedUserType;
  onClose: () => void;
  // handleSendRequest: () => void;
}
