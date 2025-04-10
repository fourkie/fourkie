import { PlaylistsResponse } from "@/app/music/type";
import { Emotion } from "@/constants/spotify";

// 클라이언트에서 Spotify 액세스 토큰을 쿠키에서 가져오는 함수
const getSpotifyProviderTokenFromCookies = () => {
  // 서버에서는 쿠키를 읽을 수 없음
  if (typeof window === "undefined") return null;

  // 모든 쿠키를 배열로 변환
  const cookies = document.cookie.split("; ");

  console.log("dfdsfsfsa : ", cookies);

  // spotify_provider_token 쿠키 찾기
  const spotifyProviderToken = cookies.find((cookie) =>
    cookie.startsWith("spotify_provider_token="),
  );

  // 쿠키에서 토큰 값을 추출
  const ProviderToken = spotifyProviderToken
    ? spotifyProviderToken.split("=")[1]
    : null;

  return ProviderToken;
};

// Spotify 액세스 토큰을 가져오는 함수
export const fetchSpotifyProviderToken = async () => {
  return getSpotifyProviderTokenFromCookies();
};

// 감정 기반으로 Spotify 플레이리스트를 검색하는 함수
export const fetchEmotionBasedPlaylists = async (
  emotion: Emotion,
): Promise<PlaylistsResponse["playlists"]["items"]> => {
  // Spotify 액세스 토큰 가져오기
  const accessToken = await fetchSpotifyProviderToken();

  if (!accessToken) {
    console.error("Access Token이 없습니다.");
    return []; // 빈 배열 반환 (오류 방지)
  }

  try {
    const response = await fetch(
      // Spotify API 요청 (감정 키워드로 플레이리스트 검색)
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        emotion,
      )}&type=playlist&limit=30&market=KR`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    // 요청 실패 시 에러 처리
    if (!response.ok) {
      throw new Error(`HTTP 오류! 상태 코드 : ${response.status}`);
    }

    const data: PlaylistsResponse = await response.json();

    console.log("가져온 플레이리스트 : ", data.playlists.items);

    return data.playlists.items;
  } catch (error) {
    console.error("플레이리스트 요청 실패 : ", error);
    return []; // 오류 발생 시 빈 배열 반환
  }
};
