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
  track_count: number;
  url: string;
}

// 플레이리스트 목록 타입
export type SpotifyPlaylistList = SpotifyPlaylistItem[];

// 북마크 관련 함수 타입
export interface BookmarkToggle {
  onToggleBookmark: (playlistId: string) => void;
}

// PlaylistListProps 타입
export interface PlaylistListProps {
  playlists: SpotifyPlaylistItem[]; // playlists 데이터 타입 정의
  bookmarkedPlaylistIds: Set<string>; // 북마크된 playlist의 id
  isTab: "recommend" | "bookmark"; // 탭 상태
  onToggleBookmark: BookmarkToggle["onToggleBookmark"]; // 북마크 토글 함수
}

// PlaylistItemProps 타입
export interface PlaylistItemProps {
  playlist: SpotifyPlaylistItem; // 각 플레이리스트 아이템
  bookmarked: boolean; // 즐겨찾기 여부
  onToggleBookmark: BookmarkToggle["onToggleBookmark"]; // 북마크 토글 함수
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
