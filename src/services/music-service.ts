import { SpotifyPlaylistItem } from "@/app/music/type";
import {
  BANNED_WORDS,
  EMOTION_EXCLUDE_WORDS,
  SPOTIFY,
} from "@/constants/spotify.constant";
import { TOAST_MESSAGE } from "@/constants/toast-message.constant";

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

  const fetchWithToken = async (accessToken: string) => {
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    if (response.status === 401) {
      const data = await fetchAccessToken();

      return await fetchWithToken(data.accessToken);
    }

    if (!response.ok) {
      const errorMessage = data?.error?.message || TOAST_MESSAGE.SPOTIFY.ERROR;

      throw new Error(errorMessage);
    }

    const filteredWord = (title: string) => {
      const titleInLowerCase = title.toLowerCase();

      const containsBannedWord = BANNED_WORDS.some((word) =>
        titleInLowerCase.includes(word),
      );

      const emotionMismatchKeywords =
        EMOTION_EXCLUDE_WORDS[emotionQuery.toUpperCase()];

      const containsMismatchKeyword = emotionMismatchKeywords?.some((word) =>
        titleInLowerCase.includes(word.toLowerCase()),
      );

      return containsBannedWord || containsMismatchKeyword;
    };

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
