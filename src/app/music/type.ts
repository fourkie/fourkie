import { Emotion } from "@/constants/spotify.constant";

export interface SpotifyAccessToken {
  accessToken: string;
  expiresIn: number;
  success: boolean;
}

export interface SpotifyImage {
  url: string;
}

export interface SpotifyTracks {
  href: string;
  total: number;
}

export interface SpotifyPlaylistItem {
  music_playlist_id: string;
  id: string;
  userId: string;
  name: string;
  external_urls: { spotify: string };
  images: SpotifyImage[];
  tracks: SpotifyTracks;
  uri: string;
}

export interface Musics extends SpotifyPlaylistItem {
  userId: string;
  music_playlist_id: string;
}

export type SpotifyPlaylistList = SpotifyPlaylistItem[];

export interface EmotionSelectProps {
  value: Emotion;
  onChange: (value: Emotion) => void;
  todayEmotion: Emotion;
}

export enum PlaylistTabProps {
  RECOMMEND = "recommend",
  BOOKMARK = "bookmark",
}

export interface TabButtonsProps {
  activeTab: PlaylistTabProps | undefined;
  onTabChange: (tab: PlaylistTabProps) => void;
}

export interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
  activeTab: PlaylistTabProps;
}

export interface BookmarkMutationPayload {
  music_playlist_id: string;
  name: string;
  external_urls: { spotify: string };
  images: { url: string }[];
  tracks: { href: string; total: number };
  uri: string;
}

export interface PlaylistCardProps {
  playlist: SpotifyPlaylistItem;
  userId: string;
}

export type RecommendPlaylistsProps = {
  userId: string;
  emotion: string;
};
