import React from "react";
import {
  checkEmotion,
  getPostEmotionByUserId,
} from "../../../utils/home-emotion.util";
import { HomePost } from "../types/HomePost";
import Image from "next/image";

const HomeDiary = async () => {
  const posts: HomePost[] = await getPostEmotionByUserId();
  return (
    <div className="grid grid-cols-5 gap-4 m-10 bg-gray-500 rounded">
      {posts.map((post) => {
        return (
          <div key={post.post_id}>
            <Image
              src={checkEmotion(post.post_emotion)}
              alt="Cookie Emotion"
              width={200}
              height={200}
            />
          </div>
        );
      })}
    </div>
  );
};

export default HomeDiary;
