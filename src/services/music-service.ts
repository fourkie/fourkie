import {
  SpotifyAccessToken,
  SpotifyPlaylistItem,
  SpotifyPlaylistList,
} from "@/app/music/type";
import { SPOTIFY } from "@/constants/spotify.constant";
import { TOAST_MESSAGE } from "@/constants/toast-message.constant";

export const fetchAccessToken = async () => {
  try {
    const response = await fetch(SPOTIFY.CALLBACK_ROUTE);

    if (!response.ok) {
      throw new Error(TOAST_MESSAGE.SPOTIFY.ACCESS_TOKEN_ERROR);
    }

    const data: SpotifyAccessToken = await response.json();

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error(TOAST_MESSAGE.SPOTIFY.ACCESS_TOKEN_ERROR);
  }
};

export const fetchSpotifyPlaylistList = async (
  accessToken: SpotifyAccessToken,
  query: string,
) => {
  if (!accessToken) {
    throw new Error(TOAST_MESSAGE.SPOTIFY.ACCESS_TOKEN_ERROR);
  }

  const apiUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(
    query,
  )}&type=playlist&limit=50`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    if (!response.ok || response.status === 401) {
      const spotifyErrorMessage =
        data?.error?.message || TOAST_MESSAGE.SPOTIFY.ERROR;

      throw new Error(spotifyErrorMessage);
    }

    // null이 아닌 플레이리스트 항목만 필터링
    const filteredPlaylists: SpotifyPlaylistList = data.playlists.items.filter(
      (item: SpotifyPlaylistItem) => item !== null,
    );

    return filteredPlaylists;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error(TOAST_MESSAGE.SPOTIFY.ERROR);
  }
};
