"use client";

import { EMOTIONS_QUERY } from "@/constants/emotion.constant";
import EMOTION_COOKIE_IMAGE_URL from "@/constants/emotions-url.constant";
import { useGetFriendPostsQuery } from "@/hooks/queries/use-get-friend-posts-query";
import { useGetUserByIdQuery } from "@/hooks/queries/use-get-user-by-id-query";
import { useTabStore } from "@/hooks/zustand/list-tab-store";

import EmotionImage from "@/ui/common/emotion-image.common";
import { checkEmotion } from "@/utils/home-emotion.util";

import { ChevronRight } from "lucide-react";
import Link from "next/link";

const HomeFriend = ({ userId }: { userId: string }) => {
  const {setSelectedTab} = useTabStore();
  
  //친구 포스트 값 받아오기
  const { data: posts, isPending } = useGetFriendPostsQuery({ userId });

  //친구의 포스트 오늘 날짜 기준으로 자르기
  const today = new Date().toISOString().slice(0, 10);
  const friendPostsForToday = posts?.filter((post) =>
    post.post_created_at.includes(today),
  );

  //가져온 첫 값만 띄워주기기
  const firstUserId = friendPostsForToday?.[0]?.user_id;
  const { data: user } = useGetUserByIdQuery(firstUserId);

  const onClickHandler = () => {
    setSelectedTab('friend')
  }

  if (isPending) {
    return (
      <div className="my-4 flex flex-col gap-4">
        <div className="mt-2 flex items-center justify-between">
          <div className="font-bold">
            오늘 하루 내 친구들 기분을 살펴볼까요?
          </div>
          <ChevronRight className="cursor-pointer" />
        </div>
        <div className="border-3 flex flex-row items-center rounded-xl border border-primary-200 p-4">
          로딩 중...
        </div>
      </div>
    );
  }

  //친구가 없는 or 친구가 글을 안 써서 친구 포스트가 없는 경우
  if (!friendPostsForToday || friendPostsForToday.length === 0) {
    return (
      <Link href={"/list"} onClick={onClickHandler}>
        <div className="my-4 flex flex-col gap-4">
          <div className="mt-2 flex items-center justify-between">
            <div className="font-bold">
              오늘 하루 내 친구들 기분을 살펴볼까요?
            </div>
            <ChevronRight className="cursor-pointer" />
          </div>
          <div className="border-3 flex flex-row items-center gap-4 rounded-xl border border-primary-200 p-4">
            <EmotionImage src={EMOTION_COOKIE_IMAGE_URL.SAD} size="xs" />
            <div className="flex flex-col">
              <div className="font-bold">친구의 쿠키가 없네요!</div>
              <div>친구를 추가해보는 건 어떨까요?</div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={"/list"} onClick={onClickHandler}>
      <div className="my-4 flex flex-col gap-4">
        <div className="mt-2 flex items-center justify-between">
          <div className="font-bold">
            오늘 하루 내 친구들 기분을 살펴볼까요?
          </div>
          <ChevronRight className="cursor-pointer" />
        </div>

        <div className="flex flex-row items-center gap-4 rounded-xl border border-primary-200 p-4">
          <EmotionImage
            src={checkEmotion(friendPostsForToday?.[0]?.post_emotion)}
            size="xs"
          />
          <div className="flex flex-col">
            <div className="font-bold">오늘 내 친구들은?</div>
            <div className="text-sm">
              {user?.user_nickname} 님은{" "}
              {EMOTIONS_QUERY[friendPostsForToday?.[0]?.post_emotion]} 하루를
              보냈어요
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HomeFriend;
