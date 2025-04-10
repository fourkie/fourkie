"use client";

import { Emotion } from "@/constants/spotify";
import { useGetAllPlaylistsByQueryQuery } from "@/hooks/queries/use-get-all-playlists-by-query-query";

const EmotionBasedPlaylists = ({ emotion }: { emotion: Emotion }) => {
  const {
    data: playlists,
    isLoading,
    isError,
  } = useGetAllPlaylistsByQueryQuery(emotion);

  console.log("플레이리스트", playlists);
  console.log("emotion", emotion);

  if (isLoading) return <p>플레이리스트 불러오는 중...</p>;
  if (isError) return <p>플레이리스트를 불러오는 데 실패했습니다.</p>;

  return (
    <div>
      <h2>🎶 {emotion} 분위기의 플레이리스트</h2>
      <ul>
        {playlists?.map((playlist) => (
          <li key={playlist.id}>{playlist.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default EmotionBasedPlaylists;
