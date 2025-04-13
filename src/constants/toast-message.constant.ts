export const TOAST_MESSAGE = {
  ERROR: {},
  HOMEERROR: "불러오는 중 오류가 났습니다.",
  SPOTIFY: {
    ERROR:
      "Spotify authentication encountered a problem. Please try again later.",
    CLIENT_ERROR: "Missing Spotify credentials",
    CLIENT_ID_ERROR: "Missing Spotify client ID",
    CODE_ERROR: "Authorization code is missing",
    RES_ERROR: "Spotify API responded with an error",
    ACCESS_TOKEN_ERROR: "Failed to get access token",
    REFRESH_TOKEN_ERROR:
      "Something went wrong while refreshing your access. Please try again shortly.",
  },
  AI: {
    HUGGINGFACE: {
      ERROR: "감정 분석 요청에 실패했습니다. 잠시 후 다시 시도해주세요.",
      SERVER_ERROR: "서버 오류가 발생했습니다. 나중에 다시 시도해주세요.",
    },
  },
};
