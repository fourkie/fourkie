import { PlaylistItem } from "./playlist-item";
import { PlaylistListProps } from "../type";

export const PlaylistList = ({
  playlists,
  bookmarkedPlaylistIds,
  onToggleBookmark,
}: PlaylistListProps) => {
  return (
    <ul>
      {playlists.map((playlist) => (
        <PlaylistItem
          key={playlist.id}
          playlist={playlist}
          bookmarked={bookmarkedPlaylistIds.has(playlist.id)}
          onToggleBookmark={onToggleBookmark}
        />
      ))}
    </ul>
  );
};
