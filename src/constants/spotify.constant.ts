export const SPOTIFY = {
  TOKEN_ENDPOINT: "https://accounts.spotify.com/api/token",
  CONTENT_TYPE: "application/x-www-form-urlencoded",
  CLIENT_CREDENTIALS: "client_credentials",
  ACCESS_TOKEN: "spotify_access_token",
  PRODUCTION: "production",
  CALLBACK_ROUTE: "/api/spotify/callback",
};

export const EMOTIONS: Record<string, string> = {
  JOY: "JOY",
  EXCITED: "EXCITED",
  BUTTERFLY: "BUTTERFLY",
  GRATEFUL: "GRATEFUL",
  CALM: "CALM",
  LONELY: "LONELY",
  ANXIOUS: "ANXIOUS",
  TIRED: "TIRED",
  SAD: "SAD",
  ANGRY: "ANGRY",
};

export const EMOTION_DISPLAY_NAME: Record<keyof typeof Emotion, string> = {
  JOY: "기쁜 날",
  EXCITED: "신나는 날",
  BUTTERFLY: "설레는 날",
  GRATEFUL: "감사한 날",
  CALM: "평온한 날",
  LONELY: "외로운 날",
  ANXIOUS: "긴장한 날",
  TIRED: "아픈 날",
  SAD: "슬픈 날",
  ANGRY: "화나는 날",
};

export enum Emotion {
  JOY = "happy upbeat energetic joyful content cheerful optimistic 기쁨 즐거움 행복 만족 신바람 유쾌 활기찬",

  EXCITED = "excited lively pumped invigorated exhilarated dynamic 신남 들뜸 활기찬 열정적인 흥분된 생기있는",

  BUTTERFLY = "fluttery anticipative nervous jittery excited 설렘 기대 떨림 긴장 두근거림 안달",

  GRATEFUL = "grateful thankful appreciative trusting confident 감사 고마움 신뢰 자신감 만족",

  CALM = "calm serene peaceful relaxed tranquil mellow 평온 차분함 안도 느긋함 안정 편안함",

  LONELY = "lonely isolated abandoned solitary forlorn 외로움 고독 고립 쓸쓸함 버려짐 소외",

  ANXIOUS = "anxious nervous worried jittery tense uneasy stressed 초조 불안 걱정 긴장 당황 스트레스 충격 부끄러움 혼란 두려움 조심 당혹",

  TIRED = "tired weary exhausted drained fatigued 피로 지침 탈진 무기력 허약",

  SAD = "sad depressed sorrowful melancholic gloomy forlorn tearful 슬픔 우울 좌절 낙담 실망 괴로움 눈물 상처 염세 희생 환멸 억울 배신 비통 후회 질투 죄책감 가난 회의 열등감",

  ANGRY = "angry furious irate enraged heated upset bitter 화남 분노 짜증 노여움 성가심 악의 혐오 구역질 격분 격노",
}

// 토큰 만료 기간 (14일)
export const MS_IN_FOURTEEN_DAYS = 1000 * 60 * 60 * 24 * 14;
