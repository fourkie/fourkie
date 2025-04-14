// AccessToken 타입
export interface SpotifyAccessToken {
  accessToken: string;
  expiresIn: number;
  success: boolean;
}

// Image 타입
export interface SpotifyImage {
  url: string;
}

// 플레이리스트 아이템 타입
export interface SpotifyPlaylistItem {
  id: string;
  name: string;
  external_urls: { spotify: string };
  images: SpotifyImage[];
  tracks: {
    href: string;
    total: number;
  };
}

// 플레이리스트 목록 타입
export type SpotifyPlaylistList = SpotifyPlaylistItem[];

// 컴포넌트 Props 타입
export interface PlaylistListProps {
  playlists: SpotifyPlaylistItem[];
  bookmarkedPlaylistIds: Set<string>;
  onToggleBookmark: (playlistId: string) => void;
  isTab: "recommend" | "bookmark";
}
