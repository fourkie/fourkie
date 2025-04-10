export const getSpotifyProviderTokenFromCookies = () => {
  if (typeof window === "undefined") return null;

  const cookies = document.cookie.split("; ");
  const accessTokenCookie = cookies.find((cookie) =>
    cookie.startsWith("spotify_provider_token="),
  );

  return accessTokenCookie ? accessTokenCookie.split("=")[1] : null;
};
