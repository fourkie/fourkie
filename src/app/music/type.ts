export interface AccessToken {
  access_token: string;
}

export interface Image {
  url: string;
}

export interface Owner {
  display_name: string;
}

export interface PlaylistItem {
  id: string;
  name: string;
  images: Image[];
  owner: Owner;
}

export interface PlaylistsResponse {
  playlists: {
    href: string;
    items: PlaylistItem[];
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
  };
}
