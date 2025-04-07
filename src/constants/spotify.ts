export const SPOTIFY = {
  SCOPE: "user-read-private user-read-email",
  REDIRECT_URL: "http://localhost:3000/api/spotify/callback",
  AUTH_URL: "https://accounts.spotify.com/authorize",
  TOKEN_ENDPOINT: "https://accounts.spotify.com/api/token",
  CONTENT_TYPE: "application/x-www-form-urlencoded",
  ACCESS_TOKEN: "spotify_access_token",
  REFRESH_TOKEN: "spotify_refresh_token",
  PRODUCTION: "production",
};

export enum Emotion {
  HAPPY = "happy",
  SAD = "sad",
  FOCUS = "focus",
  ENERGETIC = "energetic",
  RELAX = "relax",
}
