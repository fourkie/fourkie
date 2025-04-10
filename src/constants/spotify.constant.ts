export const SPOTIFY = {
  SCOPE: "user-read-private user-read-email",
  REDIRECT_URL: "http://localhost:3000/api/spotify/callback",
  AUTH_URL: "https://accounts.spotify.com/authorize",
  TOKEN_ENDPOINT: "https://accounts.spotify.com/api/token",
  CONTENT_TYPE: "application/x-www-form-urlencoded",
  ACCESS_TOKEN: "spotify_access_token",
  REFRESH_TOKEN: "spotify_refresh_token",
  PROVIDER_TOKEN: "spotify_provider_token",
  PROVIDER_REFRESH_TOKEN: "spotify_provider_refresh_token",
  PRODUCTION: "production",
};

// 상의 후 수정 예정
export enum Emotion {
  HAPPY = "happy upbeat energetic",
  SAD = "sad emotional chill",
  FOCUS = "focus",
  CALM = "calm peaceful acoustic relax",
  ANGRY = "angry rock intense",
}

// milliseconds
export const MS_IN_SECOND = 1000; // 1초
export const MS_IN_MINUTE = MS_IN_SECOND * 60; // 1분
export const MS_IN_HOUR = MS_IN_MINUTE * 60; // 1시간
export const MS_IN_DAY = MS_IN_HOUR * 24; // 1일

// 토큰 만료 기간
export const DEFAULT_PROVIDER_TOKEN_EXPIRE_SEC = 3600; // 1시간
export const REFRESH_TOKEN_EXPIRE_MS = MS_IN_DAY * 14; // 14일
