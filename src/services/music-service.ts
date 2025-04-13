import {
  SpotifyAccessToken,
  SpotifyPlaylistItem,
  SpotifyPlaylistList,
} from "@/app/music/type";
import { SPOTIFY } from "@/constants/spotify.constant";
import { TOAST_MESSAGE } from "@/constants/toast-message.constant";

export const fetchAccessToken = async () => {
  const response = await fetch(SPOTIFY.CALLBACK_ROUTE);

  if (!response.ok) {
    throw new Error(TOAST_MESSAGE.SPOTIFY.ACCESS_TOKEN_ERROR);
  }

  const data = await response.json();

  return data;
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

  const response = await fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok || response.status === 401) {
    throw new Error(TOAST_MESSAGE.SPOTIFY.ERROR);
  }

  const data = await response.json();

  // null이 아닌 플레이리스트 항목만 필터링
  const filteredPlaylists: SpotifyPlaylistList = data.playlists.items.filter(
    (item: SpotifyPlaylistItem) => item !== null,
  );

  console.log("filteredPlaylists : ", filteredPlaylists);

  return filteredPlaylists;
};
