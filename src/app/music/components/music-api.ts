import { Emotion } from "@/constants/spotify";
import { AccessToken, PlaylistsResponse } from "../type";

// Spotify 토큰 요청
export const getAccessToken = async () => {
  try {
    const response = await fetch("/api/spotify/token");

    const data: AccessToken = await response.json();

    return data.access_token;
  } catch (error) {
    console.error("토큰 요청 실패 : ", error);
    return null;
  }
};

// 감정 기반 플레이리스트 요청
export const getEmotionPlaylists = async (
  emotion: Emotion,
  accessToken: string,
) => {
  const query = emotion;

  try {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        query,
      )}&type=playlist&limit=30&market=KR`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    const data: PlaylistsResponse = await response.json();

    return data.playlists.items;
  } catch (error) {
    console.error("플레이리스트 요청 실패 : ", error);
    return [];
  }
};
