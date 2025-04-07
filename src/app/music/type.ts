export interface AccessToken {
  access_token: string;
}

export interface TrackItem {
  id: string;
  name: string;
  preview_url: string;
  artists: { name: string }[];
}
