import React from "react";
import { checkEmotion } from "../../../utils/home-emotion.util";
import { HomePost } from "../types/HomePost";
import { getPostEmotionByUserId } from "@/services/home-services";
import { CommonEmotionImage } from "@/_components/common-emotion-image";

const HomeDiary = async () => {
  const posts: HomePost[] = await getPostEmotionByUserId();
  return (
    <div className="grid grid-cols-5 gap-4 m-10 bg-gray-500 rounded">
      {posts.map((post) => {
        return (
          <div key={post.post_id}>
            <CommonEmotionImage
              src={checkEmotion(post.post_emotion)}
              size={"xl"}
            />
          </div>
        );
      })}
    </div>
  );
};

export default HomeDiary;
