import { Emotion } from "@/constants/spotify.constant";
import { Dispatch, SetStateAction } from "react";
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
export interface EmotionSelectProps {
  emotion: keyof typeof Emotion;
  onChange: (emotion: keyof typeof Emotion) => void;
  todayEmotion?: keyof typeof Emotion | null;
  isScrolled: boolean;
}

export interface PlaylistTabContainerProps {
  userId: string;
  emotion: keyof typeof Emotion;
  activeTab: PlaylistTabProps;
  onTabChange: Dispatch<SetStateAction<PlaylistTabProps>>;
}

export enum PlaylistTabProps {
  RECOMMEND = "추천 플리",
  BOOKMARK = "즐겨찾기",
}
export interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
  activeTab: PlaylistTabProps;
}
export interface PlaylistContentProps {
  userId: string;
  activeTab: PlaylistTabProps;
  emotion?: keyof typeof Emotion;
}
export interface PlaylistCardProps {
  playlist: SpotifyPlaylistItem;
  userId: string;
}
export type BookmarkedProps = {
  musicPlaylistId: string;
  userId: string;
};
