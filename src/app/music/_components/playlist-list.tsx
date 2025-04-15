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
        <li key={playlist.id}>
          <PlaylistItem
            playlist={playlist}
            bookmarked={bookmarkedPlaylistIds.has(playlist.id)}
            onToggleBookmark={onToggleBookmark}
          />
        </li>
      ))}
    </ul>
  );
};
