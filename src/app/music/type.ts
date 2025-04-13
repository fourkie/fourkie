// AccessToken 응답 타입
export interface SpotifyAccessToken {
  access_token: string;
  expiresIn: number;
  success: boolean;
}

// Spotify 플레이리스트 API 응답 타입
export type SpotifyPlaylistList = SpotifyPlaylistItem[];

// 개별 플레이리스트 아이템 타입
export interface SpotifyPlaylistItem {
  id: string;
  images: SpotifyImage[];
  name: string;
  tracks: {
    href: string;
    total: number;
  };
}

// 이미지 정보 타입
export interface SpotifyImage {
  url: string;
}
