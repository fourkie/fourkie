import React from "react";
import { checkEmotion } from "../../../utils/home-emotion.util";
import { HomePost } from "../types/HomePost";
import { getPostEmotionByUserId, getUserId } from "@/services/home-services";
import { CommonEmotionImage } from "@/_components/common-emotion-image";
import HomeNoPost from "./home-nopost";
import { redirect } from "next/navigation";

const HomeDiary = async () => {
  const userId = await getUserId();
  const posts: HomePost[] | boolean = await getPostEmotionByUserId(userId);

  if (!posts) {
    redirect("/sign-in");
  }

  return (
    <div className="grid grid-cols-5 gap-4 m-10 bg-gray-200 rounded">
      {posts.length > 0 ? (
        posts.map((post) => {
          return (
            <div key={post.post_id}>
              <CommonEmotionImage
                src={checkEmotion(post.post_emotion)}
                size={"xl"}
              />
            </div>
          );
        })
      ) : (
        <HomeNoPost />
      )}
    </div>
  );
};

export default HomeDiary;
