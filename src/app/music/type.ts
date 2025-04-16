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

// Tracks 타입
export interface SpotifyTracks {
  href: string;
  total: number;
}

// 플레이리스트 아이템 타입
export interface SpotifyPlaylistItem {
  id: string;
  name: string;
  external_urls: { spotify: string };
  images: SpotifyImage[];
  tracks: SpotifyTracks;
  uri: string;
}

// 플레이리스트 목록 타입
export type SpotifyPlaylistList = SpotifyPlaylistItem[];

// EmotionSelectProps 타입
export interface EmotionSelectProps {
  value: Emotion;
  onChange: (value: Emotion) => void;
}

export enum PlaylistTabProps {
  RECOMMEND = "recommend",
  BOOKMARK = "bookmark",
}

// TabButtonsProps 타입
export interface TabButtonsProps {
  activeTab: PlaylistTabProps | undefined;
  onTabChange: (tab: PlaylistTabProps) => void;
}

// TabButtonProps 타입
export interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export interface BookmarkMutationPayload {
  music_playlist_id: string;
  name: string;
  external_urls: { spotify: string };
  images: { url: string }[];
  tracks: { href: string; total: number };
  uri: string;
}
