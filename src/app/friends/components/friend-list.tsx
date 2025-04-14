"use client";

import { useSearchUserQuery } from "@/hooks/queries/use-search-user-query";
import { FriendListProps, SelectedUserType } from "../type";
import { useGetMyFriendsQuery } from "@/hooks/queries/use-get-my-friends-query";
import EmotionImage from "@/ui/common/emotion-image.common";
import EMOTION_COOKIE_IMAGE_URL from "@/constants/emotions-url.constant";

const FriendList = ({
  searchUser,
  setSelectedUser,
}: FriendListProps & { setSelectedUser: (user: SelectedUserType) => void }) => {
  const { data: searchedUser } = useSearchUserQuery(searchUser, !!searchUser);
  const { data: friendList } = useGetMyFriendsQuery();

  if (searchUser && searchedUser) {
    return (
      <div className="px-3 py-2">
        <div
          onClick={() => setSelectedUser(searchedUser)}
          className="cursor-pointer flex items-center gap-2 font-medium"
        >
          <EmotionImage src={EMOTION_COOKIE_IMAGE_URL.JOY} size="xs" />
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
