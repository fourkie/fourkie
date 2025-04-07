// AccessToken 응답 타입
export interface AccessToken {
  access_token: string;
}

// Spotify 플레이리스트 API 응답 타입
export interface PlaylistsResponse {
  playlists: {
    items: PlaylistItem[];
  };
}

// 개별 플레이리스트 아이템 타입
export interface PlaylistItem {
  id: string;
  images: SpotifyImage[];
  name: string;
  owner: {
    id: string;
  };
  tracks: {
    href: string;
    total: number;
  };
}

// 이미지 정보 타입
export interface SpotifyImage {
  url: string;
}
