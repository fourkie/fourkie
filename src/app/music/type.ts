import { Emotion } from "@/constants/spotify.constant";

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

// PlaylistListProps 타입
export interface PlaylistListProps {
  playlists: SpotifyPlaylistItem[];
  bookmarkedPlaylistIds: Set<string>;
  onToggleBookmark: (playlistId: string) => void;
  isTab: "recommend" | "bookmark";
}

// EmotionSelectProps 타입
export interface EmotionSelectProps {
  value: Emotion;
  onChange: (value: Emotion) => void;
}

// TabButtonsProps 타입
export interface TabButtonsProps {
  isTab: "recommend" | "bookmark";
  onTabChange: (tab: "recommend" | "bookmark") => void;
}
