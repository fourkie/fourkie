export const TOAST_MESSAGE = {
  ERROR: {},
  HOMEERROR: "불러오는 중 오류가 났습니다.",
  SPOTIFY: {
    ERROR: "예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
    CLIENT_ERROR: "Spotify 자격 증명이 누락되었습니다.",
    ACCESS_TOKEN_ERROR: "액세스 토큰을 가져오는 데 실패했습니다.",
    PLAYLISTS_ERROR: "플레이리스트를 불러오는 데 실패했습니다.",
    BOOKMARK_ERROR: "추가한 즐겨찾기 플레이리스트가 없습니다.",
    ADD_BOOKMARK_ERROR: "즐겨찾기에 추가하지 못했습니다. 다시 시도해 주세요.",
    REMOVE_BOOKMARK_ERROR:
      "즐겨찾기에서 삭제하지 못했습니다. 다시 시도해 주세요.",
  },
  AI: {
    HUGGINGFACE: {
      ERROR: "HuggingFace API request failed",
      SERVER_ERROR: "Server error occurred",
    },
  },
};
