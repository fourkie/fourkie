"use client";

import { useSearchUserQuery } from "@/hooks/queries/use-search-user-query";
import { FriendListProps, SelectedUserType } from "../type";
import { useGetMyFriendsQuery } from "@/hooks/queries/use-get-my-friends-query";

const FriendList = ({
  searchUser,
  setSelectedUser,
}: FriendListProps & { setSelectedUser: (user: SelectedUserType) => void }) => {
  const { data: searchedUser } = useSearchUserQuery(searchUser, !!searchUser);
  const { data: friendList } = useGetMyFriendsQuery();

  if (searchUser && searchedUser) {
    return (
      <div className="border">
        <div
          onClick={() => setSelectedUser(searchedUser)}
          className="border cursor-pointer"
        >
          {searchedUser.user_nickname}
        </div>
      </div>
    );
  }

  return (
    <div className="border">
      {friendList?.map((friend) => (
        <div key={friend.user_uid} className="border">
          {friend.user_nickname}
        </div>
      ))}
    </div>
  );
};

export default FriendList;
