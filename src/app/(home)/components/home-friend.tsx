"use client";

import EMOTION_COOKIE_IMAGE_URL from "@/constants/emotions-url.constant";
import EmotionImage from "@/ui/common/emotion-image.common";

const HomeFriend = () => {
  return (
    <div className="flex flex-col">
      <div>오늘 하루 내 친구들 기분을 살펴볼까요? </div>
      <div className="border rounded-xl bg-primary-200">
        <EmotionImage src={EMOTION_COOKIE_IMAGE_URL.JOY} size={"xs"} />
        <div>오늘 내 친구들은? </div>
        <div>닉네임 님은 땡땡한 하루를 보냈어요</div>
      </div>
    </div>
  );
};

export default HomeFriend;
