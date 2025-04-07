import { Emotion } from "@/constants/spotify";
import { EmotionKeywords } from "@/utils/music-emotion.util";
import { AccessToken, TrackItem } from "../type";

// Access Token 발급
export const getAccessToken = async () => {
  try {
    const response = await fetch("/api/spotify/token");

    if (!response.ok) {
      console.error("AccessToken 요청 실패");
      return null;
    }

    const data: AccessToken = await response.json();

    return data.access_token;
  } catch (error) {
    console.error("AccessToken 예외 발생 : ", error);
    return null;
  }
};

// 감정 키워드로 직접 트랙(노래) 검색
export const getTracksByEmotion = async (
  emotion: Emotion,
  accessToken: string,
) => {
  const searchKeyword = EmotionKeywords[emotion] ?? emotion.toString();

  try {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        searchKeyword,
      )}&type=track&limit=30&market=KR`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!response.ok) {
      console.error("트랙 검색 실패");
      return [];
    }

    const data = await response.json();
    const tracks: TrackItem[] = data.tracks.items;

    return tracks;
  } catch (err) {
    console.error("트랙 검색 중 예외 발생 : ", err);
    return [];
  }
};
