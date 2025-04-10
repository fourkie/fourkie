import { SPOTIFY } from "@/constants/spotify.constant";

export const getSpotifyProviderTokenFromCookies = () => {
  if (typeof window === "undefined") return null;

  const cookies = document.cookie.split("; ");

  const spotifyProviderTokenCookie = cookies.find((cookie) =>
    cookie.startsWith(`${SPOTIFY.PROVIDER_TOKEN}=`),
  );

  return spotifyProviderTokenCookie
    ? spotifyProviderTokenCookie.split("=")[1]
    : null;
};
