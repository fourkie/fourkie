"use client";

import { useSearchUserQuery } from "@/hooks/queries/use-search-user-query";
import { FriendListProps } from "../type";
import { useGetMyFriendsQuery } from "@/hooks/queries/use-get-my-friends-query";

const FriendList = ({ searchUser }: FriendListProps) => {
  const { data: searchedUser } = useSearchUserQuery(searchUser, !!searchUser);
  const { data: friendList } = useGetMyFriendsQuery();

  if (searchUser && searchedUser) {
    return (
      <div className="border">
        <div className="border">{searchedUser.user_nickname}</div>
      </div>
    );
  }

  return (
    <div>
      {friendList?.map((friend) => (
        <div key={friend.user_uid} className="border">
          {friend.user_nickname}
        </div>
      ))}
    </div>
  );
};

export default FriendList;
