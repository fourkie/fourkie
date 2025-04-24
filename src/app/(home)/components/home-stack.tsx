"use client";

import { useGetAllPostsByIdQuery } from "@/hooks/queries/use-get-my-posts-query";
import EmotionImage from "@/ui/common/emotion-image.common";
import { checkEmotion } from "@/utils/home-emotion.util";

const common =
  " grid grid-cols-5 gap-3 border-2 border-dashed border-primary-200 rounded-xl p-5 ";

const HomeStack = ({ userId }: { userId: string }) => {
  const { data: myPosts, isPending } = useGetAllPostsByIdQuery({ userId });
  if (isPending || myPosts == undefined) {
    return <div className={`${common}`}>로딩 중이예요!</div>;
  }

  //1200으로 잡고 w? h? 100%로 잡기
  //최신 순으로 받아온 거 오래된 순으로 바꾸기
  const posts = [...myPosts].reverse();

  return (
    <div className={`${common}`}>
      {posts?.length > 20
        ? posts.slice(0, 20).map((post) => {
            return (
              <div key={post.post_id}>
                <EmotionImage
                  src={checkEmotion(post.post_emotion)}
                  size={"xs"}
                />
              </div>
            );
          })
        : posts.map((post) => {
            return (
              <div key={post.post_id}>
                <EmotionImage
                  src={checkEmotion(post.post_emotion)}
                  size={"xs"}
                />
              </div>
            );
          })}
    </div>
  );
};

export default HomeStack;
