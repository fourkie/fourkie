import React from "react";
import { checkEmotion, getUserEmotions } from "../utils/home-emotion.util";
import { HomePost } from "../types/home-types";
import Image from "next/image";

const HomeDiary = async () => {
  const posts: HomePost[] = await getUserEmotions();
  return (
    <div className="grid grid-cols-5 gap-4 m-10 bg-gray-500 rounded">
      {posts.map((post) => {
        return (
          <div className="border-3 boreder-black-700" key={post.post_id}>
            <Image
              src={checkEmotion(post.post_emotion)}
              alt="Joy Emotion"
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
