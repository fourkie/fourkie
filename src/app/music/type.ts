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

export interface EmotionSelectProps {
  emotion: keyof typeof Emotion;
  onChange: (emotion: keyof typeof Emotion) => void;
  todayEmotion?: keyof typeof Emotion | null;
  scrolled: boolean;
}

export interface PlaylistCardProps {
  playlist: SpotifyPlaylistItem;
  userId: string;
  lastCard: boolean;
}

export type BookmarkedProps = {
  musicPlaylistId: string;
  userId: string;
};
