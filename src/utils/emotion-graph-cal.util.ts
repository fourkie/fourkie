import { Posts } from "@/types/posts.type";
import dayjs from "dayjs";

const emotionGraphCal = (posts: Posts[]) => {
  const emotionCounts: EmotionCounts = {
    JOY: 0,
    EXCITED: 0,
    BUTTERFLY: 0,
    GRATEFUL: 0,
    CALM: 0,
    LONELY: 0,
    ANXIOUS: 0,
    TIRED: 0,
    SAD: 0,
    ANGRY: 0,
  };

  // 받은 posts 배열 최근 3개월로 필터링
  const filteredPosts = posts.filter((post) => {
    const threeMonthsAgo = dayjs().subtract(3, "month");
    return dayjs(post.post_created_at).isAfter(threeMonthsAgo);
  });

  // 받은 posts 배열의 감정 수 세기
  filteredPosts.forEach((post) => {
    const emotion = post.post_emotion;
    if (emotionCounts.hasOwnProperty(emotion)) {
      emotionCounts[emotion as keyof EmotionCounts]++;
    }
  });

  // 전체 감정 개수 합
  const total = Object.values(emotionCounts).reduce(
    (acc, count) => acc + count,
    0,
  );

  // 개수 많은 순으로 정렬 후 상위 다섯개 뽑기 > 백분율로 변환
  const sortedEmotions = Object.entries(emotionCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([emotion, count]) => ({
      emotion,
      count,
      percentage: total > 0 ? ((count / total) * 100).toFixed(2) + "%" : "0%",
    }));

  return { total_emotions: total, emotions: sortedEmotions };
};

export default emotionGraphCal;

type EmotionCounts = {
  JOY: number;
  EXCITED: number;
  BUTTERFLY: number;
  GRATEFUL: number;
  CALM: number;
  LONELY: number;
  ANXIOUS: number;
  TIRED: number;
  SAD: number;
  ANGRY: number;
};
