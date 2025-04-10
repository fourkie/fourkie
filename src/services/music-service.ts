import { PlaylistsResponse } from "@/app/music/type";
import { Emotion } from "@/constants/spotify.constant";
import { getSpotifyProviderTokenFromCookies } from "@/utils/music-cookies.util";

// 감정 기반으로 Spotify 플레이리스트를 검색하는 함수
export const fetchEmotionBasedPlaylists = async (
  emotion: Emotion,
): Promise<PlaylistsResponse["playlists"]["items"]> => {
  const accessToken = getSpotifyProviderTokenFromCookies();

  if (!accessToken) {
    console.error("Access Token이 없습니다.");
    throw new Error("Access Token이 없습니다.");
  }

  try {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        emotion,
      )}&type=playlist&limit=30&market=KR`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP 오류! 상태 코드: ${response.status}`);
    }

    const data: PlaylistsResponse = await response.json();

    const filteredPlaylists = data.playlists.items.filter(
      (item) => item !== null,
    );

    return filteredPlaylists;
  } catch (error) {
    console.error("플레이리스트 요청 실패: ", error);
    throw error;
  }
};
