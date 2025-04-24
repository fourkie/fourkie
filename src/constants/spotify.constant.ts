export const SPOTIFY = {
  TOKEN_ENDPOINT: "https://accounts.spotify.com/api/token",
  CONTENT_TYPE: "application/x-www-form-urlencoded",
  CLIENT_CREDENTIALS: "client_credentials",
  ACCESS_TOKEN: "spotify_access_token",
  PRODUCTION: "production",
  CALLBACK_ROUTE: "/api/spotify/callback",
  SIGNOUT_ROUTE: "/api/spotify/sign-out",
};

export enum Emotion {
  JOY = "재미 기쁨 즐거움 행복 만족 신바람 유쾌 활기찬",

  EXCITED = "신남 들뜸 활기찬 열정적인 흥분된 생기있는",

  BUTTERFLY = "설렘 연애 달달 썸 사랑 기대 떨림 두근",

  GRATEFUL = "감사 고마움 소중한 신뢰 자신감 만족",

  CALM = "평온 차분함 잔잔한 안도 느긋함 안정 편안함",

  LONELY = "외로움 고독 고립 쓸쓸함 버려짐 소외",

  ANXIOUS = "명상 힐링되는 릴렉스 편안한",

  TIRED = "피곤 지침 무기력 아픈 위로",

  SAD = "슬픔 우울 좌절 실망 괴로움 눈물 상처 희생 억울 배신 비통 후회 질투 죄책감 가난 회의 열등감",

  ANGRY = "화남 전투력 빡침 분노 짜증 혐오 격분 격노 분노 해소 스트레스 해소 화풀이 분풀이 사이다 격정 폭발 분노조절 울분",
}

export const EMOTION_EXCLUDE_WORDS: Record<string, string[]> = {
  JOY: ["슬픔", "우울", "화남", "분노", "짜증"],
  EXCITED: ["피곤", "우울", "슬픔", "비", "찌질"],
  BUTTERFLY: ["절망", "슬픔", "좌절"],
  GRATEFUL: ["미움", "짜증", "화남"],
  CALM: ["짜증", "분노", "흥분"],
  LONELY: ["사랑", "감사", "기쁨"],
  ANXIOUS: ["흥분", "열정", "짜증"],
  TIRED: ["에너지", "흥분", "즐거움"],
  SAD: ["기쁨", "즐거움", "신남"],
  ANGRY: ["기쁨", "사랑", "편안함"],
};

export const BANNED_WORDS = [
  "존나",
  "병신",
  "쌉",
  "씹덕",
  "시발",
  "씨발",
  "새끼",
  "야발",
  "자살",
  "죽고싶을",
  "미친",
  "ㅗ",
  "ㅈ",
  "ㅅㅂ",
  "ㅈㄴ",
  "ㅂㅅ",
  "xx",
  "**",
  "fuck",
  "19",
  "29",
  "보지",
  "자지",
  "좆",
  "딸딸이",
  "자위",
  "성교",
  "섹스",
  "항문",
  "음경",
  "잠지",
];

// 토큰 만료 기간 (14일)
export const MS_IN_FOURTEEN_DAYS = 1000 * 60 * 60 * 24 * 14;
