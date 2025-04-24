"use client";

import { EMOTIONS_QUERY } from "@/constants/emotion.constant";
import EMOTION_COOKIE_IMAGE_URL from "@/constants/emotions-url.constant";
import { QUERY_KEY } from "@/constants/query-keys.constant";
import { useGetFriendPostsQuery } from "@/hooks/queries/use-get-friend-posts-query";
import { useTabStore } from "@/hooks/zustand/list-tab-store";
import { getUserById } from "@/services/user-service";

import EmotionImage from "@/ui/common/emotion-image.common";
import { checkEmotion } from "@/utils/home-emotion.util";
import { useQueries } from "@tanstack/react-query";

import { ChevronRight } from "lucide-react";
import Link from "next/link";

const HomeFriend = ({ userId }: { userId: string }) => {
  const { setSelectedTab } = useTabStore();

  //친구 포스트 값 받아오기
  const { data: posts, isPending } = useGetFriendPostsQuery({ userId });

  //친구의 포스트 오늘 날짜 기준으로 자르고 그 중 최대 4개만
  const today = new Date().toISOString().slice(0, 10);
  const friendPostsForToday = posts
    ?.filter((post) => post.post_created_at.includes(today))
    .slice(0, 4);

  //useQueries로 한번에
  const userQueries = useQueries({
    queries:
      friendPostsForToday?.map((post) => ({
        queryKey: [QUERY_KEY.USER, post.user_id],
        queryFn: () => getUserById({ userId: post.user_id }),
        enabled: !!post.user_id,
      })) ?? [],
  });

  const onClickHandler = () => {
    setSelectedTab("friend");
  };

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
      <Link href={"/friends"} onClick={onClickHandler}>
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
              <div>친구를 더 추가해보는 건 어떨까요?</div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={"/list"} onClick={onClickHandler}>
      <div className="flex items-center justify-between">
        <div className="mb-2 font-bold">
          오늘 하루 내 친구들 기분을 살펴볼까요?
        </div>
        <ChevronRight className="cursor-pointer" />
      </div>
      <div className="item-center flex flex-col rounded-xl border border-primary-200 p-4 lg:border-dashed">
        {userQueries.map((query, index) => {
          const post = friendPostsForToday?.[index];
          const user = query.data;
          const isShow = index === 0 ? "" : "hidden lg:flex";
          const key = post ? `post-${post.id}` : `no-post-${index}`;
          return (
            <div key={`${key}`}>
              {(() => {
                if (!post) return null;
                if (query.isPending) return <div>로딩 중...</div>;
                if (query.isError) return <div>에러!</div>;

                return (
                  <div
                    className={`m-3 flex flex-row items-center gap-2 ${isShow}`}
                  >
                    <EmotionImage
                      src={checkEmotion(post.post_emotion)}
                      size="xs"
                    />
                    <div className="flex flex-col">
                      <div className="font-bold lg:hidden">
                        오늘 내 친구들은?
                      </div>
                      <div className="lg:text-md text-sm lg:font-bold">
                        {user?.user_nickname} 님은{" "}
                        {EMOTIONS_QUERY[post.post_emotion]} 하루를 보냈어요.
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          );
        })}
      </div>
    </Link>
  );
};

export default HomeFriend;
