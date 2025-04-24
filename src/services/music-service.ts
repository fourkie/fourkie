import { SpotifyPlaylistItem } from "@/app/music/type";
import {
  BANNED_WORDS,
  EMOTION_EXCLUDE_WORDS,
  SPOTIFY,
} from "@/constants/spotify.constant";
import { TOAST_MESSAGE } from "@/constants/toast-message.constant";

// Spotify accessToken 요청 함수
export const fetchAccessToken = async () => {
  try {
    const response = await fetch(SPOTIFY.CALLBACK_ROUTE);

    if (!response.ok) {
      throw new Error(TOAST_MESSAGE.SPOTIFY.ACCESS_TOKEN_ERROR);
    }

    const accessToken = await response.json();

    return accessToken;
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : TOAST_MESSAGE.SPOTIFY.ACCESS_TOKEN_ERROR;
    throw new Error(errorMessage);
  }
};

// Spotify 플레이리스트 검색 함수
export const fetchSpotifyPlaylistList = async (
  accessToken: string,
  emotionQuery: string,
) => {
  if (!accessToken) {
    throw new Error(TOAST_MESSAGE.SPOTIFY.ACCESS_TOKEN_ERROR);
  }

  const apiUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(
    emotionQuery,
  )}&type=playlist&limit=50`;

  // accessToken을 받아 검색 요청하는 내부 함수
  const fetchWithToken = async (accessToken: string) => {
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    // 토큰 만료 → 새 토큰 발급 요청
    if (response.status === 401) {
      const data = await fetchAccessToken();

      return await fetchWithToken(data.accessToken);
    }

    // 그 외 실패 처리
    if (!response.ok) {
      const errorMessage = data?.error?.message || TOAST_MESSAGE.SPOTIFY.ERROR;

      throw new Error(errorMessage);
    }

    // 키워드 체크
    const filteredWord = (title: string) => {
      const titleInLowerCase = title.toLowerCase();

      // 금지어 필터링
      const containsBannedWord = BANNED_WORDS.some((word) =>
        titleInLowerCase.includes(word),
      );

      // 감정과 상반되는 키워드 필터링
      const emotionMismatchKeywords =
        EMOTION_EXCLUDE_WORDS[emotionQuery.toUpperCase()];

      // 해당 키워드 포함 필터링
      const containsMismatchKeyword = emotionMismatchKeywords?.some((word) =>
        titleInLowerCase.includes(word.toLowerCase()),
      );

      return containsBannedWord || containsMismatchKeyword;
    };

    // 유효한 플레이리스트 필터링
    const filteredPlaylists: SpotifyPlaylistItem[] =
      data.playlists.items.filter(
        (item: SpotifyPlaylistItem) =>
          item &&
          item.images &&
          item.images.length > 0 &&
          !filteredWord(item.name),
      );

    return filteredPlaylists;
  };

  try {
    return await fetchWithToken(accessToken);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : TOAST_MESSAGE.SPOTIFY.ERROR;

    throw new Error(errorMessage);
  }
};
