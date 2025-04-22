"use client";

import EMOTION_COOKIE_IMAGE_URL from "@/constants/emotions-url.constant";
import { UI_TEXT } from "@/constants/ui-text";
import { useCancelFriendRequestMutation } from "@/hooks/mutations/use-cancel-friend-request-mutation";
import { useDeleteFriendMutation } from "@/hooks/mutations/use-delete-friend-mutation";
import { useGetMyFriendsQuery } from "@/hooks/queries/use-get-my-friends-query";
import { useGetSentRequestsQuery } from "@/hooks/queries/use-get-sent-requests-query";
import { useSearchUserQuery } from "@/hooks/queries/use-search-user-query";
import { getUserForClient } from "@/services/user-client-service";
import EmotionImage from "@/ui/common/emotion-image.common";
import { useEffect, useState } from "react";
import { FriendListProps, SelectedUserType } from "../type";

const FriendList = ({
  searchUser,
  setSelectedUser,
}: FriendListProps & { setSelectedUser: (user: SelectedUserType) => void }) => {
  const { data: searchedUser } = useSearchUserQuery(searchUser);
  const { data: friendList } = useGetMyFriendsQuery();
  const [userId, setUserId] = useState<string>("");
  const { mutate: deleteFriend } = useDeleteFriendMutation();

  useEffect(() => {
    const fetchUserId = async () => {
      const result = await getUserForClient();
      if (result) setUserId(result.userId);
    };

    fetchUserId();
  }, []);

  const { data: sentReuests } = useGetSentRequestsQuery(userId);
  const { mutate: cancelRequest } = useCancelFriendRequestMutation();

  const requestedAlready = sentReuests?.find(
    (request) => request.receiver_uid === searchedUser?.user_uid,
  );

  if (searchUser && searchedUser) {
    return (
      <div className="flex w-full items-center justify-between py-3">
        <div
          onClick={() => setSelectedUser(searchedUser)}
          className="flex w-full cursor-pointer items-center gap-2 pl-3 text-lg font-medium text-grey-7"
        >
          <EmotionImage src={EMOTION_COOKIE_IMAGE_URL.JOY} size="xs" />
          <div className="w-full flex-1">{searchedUser.user_nickname}</div>
        </div>
        {requestedAlready && (
          <button
            onClick={() => cancelRequest(requestedAlready.id)}
            className="w-20 rounded-full border border-secondary-300 px-2 py-1 text-sm text-secondary-300 transition-all duration-300 hover:bg-secondary-300 hover:text-white"
          >
            요청취소
          </button>
        )}
      </div>
    );
  }

  if (searchUser && !searchedUser) {
    return (
      <div className="flex items-center justify-center py-6 text-sm text-grey-4">
        해당 닉네임 혹은 이메일을 가진 유저가 없습니다.
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-3 px-3 py-3">
      {friendList?.length === 0 ? (
        <div className="text-sm text-grey-4">
          {UI_TEXT.MYPAGE.EMPTY_FRIEND_LIST_ALT}
        </div>
      ) : (
        friendList?.map((friend) => (
          <div
            key={friend.user_uid}
            className="flex items-center justify-between py-3"
          >
            <div className="flex items-center gap-2 text-lg font-medium text-grey-7">
              <EmotionImage src={EMOTION_COOKIE_IMAGE_URL.JOY} size="xs" />
              {friend.user_nickname}
            </div>
            <button
              onClick={() =>
                deleteFriend({ userId, friendUid: friend.user_uid })
              }
              className="rounded-full border border-secondary-300 px-2 py-1 text-sm text-secondary-300 transition-all duration-300 hover:bg-secondary-300 hover:text-white"
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
