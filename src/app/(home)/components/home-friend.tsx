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

import { motion } from "framer-motion";

const commonTitle =
  "mx-auto flex max-w-[353px] pl-3 flex-row items-center justify-between w-full transition-all duration-300  pr-1 hover:pr-0";
const commonContext =
  "mx-auto min-w-[250px] min-h-[70px] w-full max-w-[353px]  rounded-2xl md:rounded-[28px] border-2 border-grey-0 md:border-primary-200 md:border-dashed";
const HomeFriend = ({ userId }: { userId: string }) => {
  const { setSelectedTab } = useTabStore();

  const { data: posts, isPending } = useGetFriendPostsQuery({ userId });

  const today = new Date().toISOString().slice(0, 10);
  const friendPostsForToday = posts
    ?.filter((post) => post.post_created_at.includes(today))
    .slice(0, 4);

  const userQueries = useQueries({
    queries:
      friendPostsForToday?.map((post) => ({
        queryKey: [QUERY_KEY.USER, post.user_id],
        queryFn: () => getUserById({ userId: post.user_id }),
        enabled: !!post.user_id,
      })) ?? [],
  });

  const onClickHandler = () => {
    setSelectedTab("secondTab");
  };

  if (isPending) {
    return (
      <div className="my-4 flex flex-col gap-2">
        <div className={`${commonTitle}`}>
          <strong className="whitespace-nowrap lg:text-[20px]">
            오늘 친구들 기분을 살펴볼까요?
          </strong>
          <ChevronRight className="cursor-pointer md:h-7 md:w-7" />
        </div>
        <div
          className={`${commonContext} item-center w-full text-xs text-grey-3`}
        >
          로딩 중...
        </div>
      </div>
    );
  }

  if (!friendPostsForToday || friendPostsForToday.length === 0) {
    return (
      <Link
        href={"/friends"}
        onClick={onClickHandler}
        className="flex flex-col gap-2"
        role="region"
        aria-label="친구가 없어 감정 데이터를 표시할 수 없음"
      >
        <div className={`${commonTitle}`}>
          <strong className="whitespace-nowrap lg:text-[20px]">
            오늘 친구들 기분을 살펴볼까요?
          </strong>
          <ChevronRight className="cursor-pointer md:h-7 md:w-7" />
        </div>
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={`${commonContext} flex flex-row`}
        >
          <div className="m-3 flex w-full flex-row items-center gap-4">
            <EmotionImage src={EMOTION_COOKIE_IMAGE_URL.SAD} size="xs" />
            <div className="flex flex-col">
              <strong>친구의 쿠키가 없네요!</strong>
              <div className="text-xs text-grey-3">
                친구를 더 추가해보는 건 어떨까요?
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    );
  }

  return (
    <Link
      href={"/list"}
      onClick={onClickHandler}
      className="flex flex-col gap-2"
      role="region"
      aria-label="친구들의 감정을 보여주는 링크"
    >
      <div className={`${commonTitle}`}>
        <strong className="whitespace-nowrap lg:text-[20px]">
          오늘 친구들 기분을 살펴볼까요?
        </strong>
        <ChevronRight className="cursor-pointer md:h-7 md:w-7" />
      </div>
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`${commonContext} flex flex-col`}
      >
        {userQueries.map((query, index) => {
          const post = friendPostsForToday?.[index];
          const user = query.data;
          const isShow = index === 0 ? "" : "hidden md:flex";
          const key = post?.id ? `post-${post.id}` : `no-post-${index}`;

          return (
            <div key={`${key}`}>
              {(() => {
                if (!post) return null;
                if (query.isPending) return <div>로딩 중...</div>;
                if (query.isError) return <div>에러!</div>;

                return (
                  <div
                    className={`mx-4 my-3 flex flex-row items-center gap-4 ${isShow}`}
                  >
                    <EmotionImage
                      src={checkEmotion(post.post_emotion)}
                      size="xs"
                    />
                    <div className="flex flex-col">
                      <strong className="md:hidden">오늘 내 친구들은?</strong>
                      <div className="lg:text-md flex flex-row whitespace-nowrap text-sm md:font-bold lg:text-[18px]">
                        <div className="text-secondary-500">
                          {user?.user_nickname}
                        </div>{" "}
                        님은 {EMOTIONS_QUERY[post.post_emotion]} 하루네요!
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          );
        })}
      </motion.div>
    </Link>
  );
};

export default HomeFriend;
