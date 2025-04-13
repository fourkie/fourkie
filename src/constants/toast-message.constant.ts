export const TOAST_MESSAGE = {
  ERROR: {
    AUTH_ERROR: "로그인이 필요한 서비스입니다.",
  },
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
      ERROR: "HuggingFace API request failed",
      SERVER_ERROR: "Server error occurred",
    },
  },
  MYPAGE: {
    SEARCH_ERROR: "유저 정보가 없습니다",
    REQUEST_ERROR: "요청 전송에 실패했습니다.",
    GET_MY_FRIENDS_ERROR: "친구 목록을 불러오지 못했습니다.",
    CHANGE_NICKNAME_ERROR: "닉네임 변경에 실패했습니다.",
    GET_NICKNAME_ERROR: "닉네임을 불러오는 데 실패했습니다.",
  },
};
