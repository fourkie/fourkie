export const SPOTIFY = {
  TOKEN_ENDPOINT: "https://accounts.spotify.com/api/token",
  CONTENT_TYPE: "application/x-www-form-urlencoded",
  CLIENT_CREDENTIALS: "client_credentials",
  ACCESS_TOKEN: "spotify_access_token",
  PRODUCTION: "production",
  CALLBACK_ROUTE: "/api/spotify/callback",
};

// 상의 후 수정 예정
export enum Emotion {
  HAPPY = "happy upbeat energetic feel-good positive party",
  SAD = "sad emotional chill melancholy reflective relaxing",
  FOCUS = "focus study concentration calm ambient instrumental",
  CALM = "calm peaceful relaxing acoustic mellow soothing",
  ANGRY = "angry rock intense aggressive loud high-energy powerful",
}

// 토큰 만료 기간
export const MS_IN_FOURTEEN_DAYS = 1000 * 60 * 60 * 24 * 14; // 14일
