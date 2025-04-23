import { Emotion } from "@/constants/spotify.constant";

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

export type SpotifyPlaylistList = SpotifyPlaylistItem[];

export interface EmotionSelectProps {
  emotion: keyof typeof Emotion;
  onChange: (emotion: keyof typeof Emotion) => void;
  todayEmotion?: keyof typeof Emotion | null;
}

export enum PlaylistTabProps {
  RECOMMEND = "recommend",
  BOOKMARK = "bookmark",
}

export interface TabButtonsProps {
  activeTab: PlaylistTabProps | undefined;
  onTabChange: (tab: PlaylistTabProps) => void;
}

export interface PlaylistCardProps {
  playlist: SpotifyPlaylistItem;
  userId: string;
}

export type RecommendPlaylistsProps = {
  userId: string;
  emotion: keyof typeof Emotion;
};
