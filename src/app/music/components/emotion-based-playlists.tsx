"use client";

import { Emotion } from "@/constants/spotify.constant";
import { useGetAllPlaylistsByQueryQuery } from "@/hooks/queries/use-get-all-playlists-by-query-query";
import Image from "next/image";

const EmotionBasedPlaylists = ({ emotion }: { emotion: Emotion }) => {
  const {
    data: playlists,
    isPending,
    isError,
  } = useGetAllPlaylistsByQueryQuery(emotion);

  if (isPending) return <p>플레이리스트 불러오는 중...</p>;
  if (isError) return <p>플레이리스트를 불러오는 데 실패했습니다.</p>;

  return (
    <div>
      <h1>분위기의 플레이리스트 : {emotion}</h1>
      <ul>
        {playlists?.map((playlist) => (
          <li
            key={playlist.id}
            className="flex gap-4 items-center justify-start mb-4"
          >
            <Image
              src={playlist.images?.[0]?.url}
              alt={`${playlist.name} cover`}
              width="50"
              height="50"
            />
            <p>{playlist.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmotionBasedPlaylists;
