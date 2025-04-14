export const TOAST_MESSAGE = {
  ERROR: {
    AUTH_ERROR: "로그인이 필요한 서비스입니다.",
  },
  HOMEERROR: "불러오는 중 오류가 났습니다.",
  SPOTIFY: {
    ERROR: "예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
    CLIENT_ERROR: "Spotify 자격 증명이 누락되었습니다.",
    ACCESS_TOKEN_ERROR: "액세스 토큰을 가져오는 데 실패했습니다.",
    PLAYLISTS_ERROR: "선택한 감정에 맞는 플레이리스트가 없습니다.",
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
    FRIEND_REQUEST_ERROR: "친구 요청에 실패했습니다",
    FRIEND_REQUEST_SUCCESS: "친구 요청을 보냈습니다.",
    FRIEND_RECEIVED_ERROR: "받은 친구 요청을 불러오지 못했습니다.",
    FRIEND_SENT_ERROR: "보낸 친구 요청을 불러오지 못했습니다.",
  },
};
