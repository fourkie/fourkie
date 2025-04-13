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

export enum Emotion {
  // Joy "기쁜" – 기쁨, 만족스러운
  JOY = "happy upbeat energetic joyful content cheerful optimistic",

  // Excited "신나는" – 신이 난
  EXCITED = "excited lively pumped invigorated exhilarated dynamic",

  // Butterfly "설레는" – 흥분, 안달하는
  BUTTERFLY = "fluttery anticipative nervous jittery excited",

  // Grateful "감사한" – 감사하는, 신뢰하는, 자신하는
  GRATEFUL = "grateful thankful appreciative trusting confident",

  // Calm "평온한" – 편안한, 느긋, 안도
  CALM = "calm serene peaceful relaxed tranquil mellow",

  // Lonely "외로운" – 외로운, 고립된, 버려진, 고립된(당황한)
  LONELY = "lonely isolated abandoned solitary forlorn",

  // Anxious "긴장되는" – 초조한, 불안, 걱정스러운, 남의 시선을 의식하는, 당황, 스트레스 받는, 충격 받은, 부끄러운, 혼란스러운(당황한), 혼란스러운, 두려운, 조심스러운, 당혹스러운
  ANXIOUS = "anxious nervous worried jittery tense uneasy stressed",

  // Tired "아픈" – 마비된, 취약한
  TIRED = "tired weary exhausted drained fatigued",

  // Sad "슬픈" – 슬픔, 우울한, 좌절한, 눈물이 나는, 낙담한, 괴로워하는, 실망한, 툴툴대는, 상처, 염세적인, 희생된, 환멸을 느끼는, 한심한, 억울한, 배신당한, 비통한, 방어적인, 후회되는, 질투하는, 죄책감의, 가난한 불우한, 회의적인, 열등감
  SAD = "sad depressed sorrowful melancholic gloomy forlorn tearful",

  // Angry "화나는" – 짜증내는, 노여워하는, 분노, 성가신, 악의적인, 혐오스러운, 구역질 나는
  ANGRY = "angry furious irate enraged heated upset bitter",
}

// 토큰 만료 기간 (14일)
export const MS_IN_FOURTEEN_DAYS = 1000 * 60 * 60 * 24 * 14;
