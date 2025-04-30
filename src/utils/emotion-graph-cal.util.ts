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

  const filteredPosts = posts.filter((post) => {
    const threeMonthsAgo = dayjs().subtract(3, "month");
    return dayjs(post.post_created_at).isAfter(threeMonthsAgo);
  });

  filteredPosts.forEach((post) => {
    const emotion = post.post_emotion;
    if (emotionCounts.hasOwnProperty(emotion)) {
      emotionCounts[emotion as keyof EmotionCounts]++;
    }
  });

  const total = Object.values(emotionCounts).reduce(
    (acc, count) => acc + count,
    0,
  );

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
