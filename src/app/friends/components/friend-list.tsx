"use client";

import { useSearchUserQuery } from "@/hooks/queries/use-search-user-query";
import { FriendListProps, SelectedUserType } from "../type";
import { useGetMyFriendsQuery } from "@/hooks/queries/use-get-my-friends-query";
import EmotionImage from "@/ui/common/emotion-image.common";
import EMOTION_COOKIE_IMAGE_URL from "@/constants/emotions-url.constant";
import { deleteFriend } from "@/services/friend-request-service";
import { getUserForClient } from "@/services/user-client-service";
import { UI_TEXT } from "@/constants/ui-text";
import { useEffect, useState } from "react";

const FriendList = ({
  searchUser,
  setSelectedUser,
}: FriendListProps & { setSelectedUser: (user: SelectedUserType) => void }) => {
  const { data: searchedUser } = useSearchUserQuery(searchUser);
  const { data: friendList } = useGetMyFriendsQuery();
  const [userId, setUserId] = useState<string>("");
  useEffect(() => {
    const fetchUserId = async () => {
      const result = await getUserForClient(); // 이 함수가 Promise<{ userId: string }>
      if (result) setUserId(result.userId);
    };

    fetchUserId();
  }, []);

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
    <div className="flex flex-col gap-3 w-full px-3 py-3">
      {friendList?.length === 0 ? (
        <div className="text-sm text-grey-4">
          {UI_TEXT.MYPAGE.EMPTY_FRIEND_LIST_ALT}
        </div>
      ) : (
        friendList?.map((friend) => (
          <div
            key={friend.user_uid}
            className="flex justify-between items-center py-3"
          >
            <div className="flex items-center gap-2 font-semibold text-xl text-grey-7">
              <EmotionImage src={EMOTION_COOKIE_IMAGE_URL.JOY} size="s" />
              {friend.user_nickname}
            </div>
            <button
              onClick={() =>
                deleteFriend({ userId, friendUid: friend.user_uid })
              }
              className="text-sm text-secondary-300 border border-secondary-300 rounded-full px-2 py-1 hover:bg-secondary-300 hover:text-white transition-all duration-300"
            >
              친구 끊기
            </button>
          </div>
        ))
      )}
    </div>
  );
};
export default FriendList;
