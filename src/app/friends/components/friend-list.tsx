"use client";

import EMOTION_COOKIE_IMAGE_URL from "@/constants/emotions-url.constant";
import { UI_TEXT } from "@/constants/ui-text";
import { useCancelFriendRequestMutation } from "@/hooks/mutations/use-cancel-friend-request-mutation";
import { useDeleteFriendMutation } from "@/hooks/mutations/use-delete-friend-mutation";
import { useGetMyFriendsQuery } from "@/hooks/queries/use-get-my-friends-query";
import { useGetSentRequestsQuery } from "@/hooks/queries/use-get-sent-requests-query";
import { useSearchUserQuery } from "@/hooks/queries/use-search-user-query";
import { getUserForClient } from "@/services/user-client-service";
import Alert from "@/ui/common/alert.common";
import EmotionGraph from "@/ui/common/emotion-graph.common";
import EmotionImage from "@/ui/common/emotion-image.common";
import EmptyAlert from "@/ui/common/empty-alert.common";
import Popup from "@/ui/common/popup-bg.common";
import { motion } from "framer-motion";
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
  const { mutate: cancelRequest } = useCancelFriendRequestMutation();

  const [openGraphPopup, setOpenGraphPopup] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState<{
    userId: string;
    nickname: string;
  }>({ userId: "", nickname: "" });

  const [openDeleteFriendAlert, setOpenDeleteFriendAlert] = useState(false);
  const [friendToDelete, setFriendToDelete] = useState<{
    userId: string;
    nickname: string;
  }>({ userId: "", nickname: "" });

  useEffect(() => {
    const fetchUserId = async () => {
      const result = await getUserForClient();
      if (result) setUserId(result.userId);
    };
    fetchUserId();
  }, []);

  const { data: sentRequests } = useGetSentRequestsQuery(userId);

  const handleFriendClick = (friend: {
    user_uid: string;
    user_nickname: string;
  }) => {
    setSelectedFriend({
      userId: friend.user_uid,
      nickname: friend.user_nickname,
    });
    setOpenGraphPopup(true);
  };

  if (searchUser) {
    if (searchedUser && searchedUser.length > 0) {
      return (
        <div className="flex flex-col gap-3 py-3">
          {searchedUser.map((user) => {
            const isFriend = friendList?.some(
              (friend) => friend.user_uid === user.user_uid,
            );
            const alreadyRequested = sentRequests?.find(
              (request) => request.receiver_uid === user.user_uid,
            );

            return (
              <div
                key={user.user_uid}
                className="flex w-full items-center justify-between py-3"
              >
                <div className="flex w-full cursor-pointer items-center gap-2 text-lg font-medium text-grey-7">
                  <EmotionImage
                    src={EMOTION_COOKIE_IMAGE_URL.EXCITED}
                    size="xs"
                  />
                  <div className="w-full flex-1">{user.user_nickname}</div>
                </div>

                {isFriend ? (
                  <button
                    aria-label="친구 끊기 버튼"
                    onClick={() => {
                      setFriendToDelete({
                        userId: user.user_uid,
                        nickname: user.user_nickname,
                      });
                      setOpenDeleteFriendAlert(true);
                    }}
                    className="min-w-[75px] rounded-full border border-secondary-300 px-2 py-1 text-sm text-secondary-300 transition-all duration-300 hover:bg-secondary-300 hover:text-white"
                  >
                    친구끊기
                  </button>
                ) : alreadyRequested ? (
                  <button
                    aria-label="요청 취소 버튼"
                    onClick={() => cancelRequest(alreadyRequested.id)}
                    className="min-w-[75px] rounded-full border border-amber-400 px-2 py-1 text-sm text-amber-500 transition-all duration-300 hover:bg-amber-400 hover:text-white"
                  >
                    요청취소
                  </button>
                ) : (
                  <button
                    aria-label="친구 요청 버튼"
                    onClick={() => setSelectedUser(user)}
                    className="min-w-[75px] rounded-full border border-primary-300 px-2 py-1 text-sm text-primary-300 transition-all duration-300 hover:bg-primary-300 hover:text-white"
                  >
                    친구요청
                  </button>
                )}
              </div>
            );
          })}

          {openDeleteFriendAlert && friendToDelete.userId && (
            <Alert
              title="친구끊기"
              contents={
                <>
                  정말로&nbsp;
                  <span className="font-semibold text-primary-300">
                    {friendToDelete.nickname}
                  </span>
                  &nbsp;님과
                  <br /> 친구를 끊으시겠습니까?
                </>
              }
              setOpenPopup={setOpenDeleteFriendAlert}
              confirm={() => {
                deleteFriend({ userId, friendUid: friendToDelete.userId });
                setOpenDeleteFriendAlert(false);
              }}
            />
          )}
        </div>
      );
    } else {
      return (
        <EmptyAlert text="해당 닉네임 혹은 이메일을 가진 유저가 없습니다." />
      );
    }
  }

  return (
    <>
      <div className="flex w-full flex-col gap-3 py-3">
        {friendList?.length === 0 ? (
          <EmptyAlert text={UI_TEXT.MYPAGE.EMPTY_FRIEND_LIST_ALT} />
        ) : (
          friendList?.map((friend, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: { delay: index * 0.06 },
              }}
              viewport={{ once: true }}
              key={friend.user_uid}
              className="flex w-full items-center justify-between py-3"
            >
              <div
                onClick={() => handleFriendClick(friend)}
                className="flex w-full cursor-pointer items-center gap-2 text-lg font-medium text-grey-7"
              >
                <EmotionImage
                  src={EMOTION_COOKIE_IMAGE_URL.EXCITED}
                  size="xs"
                />
                {friend.user_nickname}
              </div>
              <button
                aria-label="친구 끊기 버튼"
                onClick={() => {
                  setFriendToDelete({
                    userId: friend.user_uid,
                    nickname: friend.user_nickname,
                  });
                  setOpenDeleteFriendAlert(true);
                }}
                className="min-w-[75px] rounded-full border border-secondary-300 px-2 py-1 text-sm text-secondary-300 transition-all duration-300 hover:bg-secondary-300 hover:text-white"
              >
                친구끊기
              </button>
            </motion.div>
          ))
        )}
      </div>

      {openGraphPopup && selectedFriend && (
        <Popup>
          <EmotionGraph
            isListPage={true}
            openPopup={openGraphPopup}
            setOpenPopup={() => setOpenGraphPopup(false)}
            userId={selectedFriend!.userId}
            nickname={selectedFriend!.nickname}
          />
        </Popup>
      )}

      {openDeleteFriendAlert && friendToDelete.userId && (
        <Alert
          title="친구 삭제"
          contents={
            <>
              정말로&nbsp;
              <span className="font-semibold text-primary-300">
                {friendToDelete.nickname}
              </span>
              &nbsp;님과
              <br /> 친구를 끊으시겠습니까?
            </>
          }
          setOpenPopup={setOpenDeleteFriendAlert}
          confirm={() => {
            deleteFriend({ userId, friendUid: friendToDelete.userId });
            setOpenDeleteFriendAlert(false);
          }}
        />
      )}
    </>
  );
};
export default FriendList;
