"use client";

import { Emotion } from "@/constants/spotify";
import { useGetAllPlaylistsByQueryQuery } from "@/hooks/queries/use-get-all-playlists-by-query-query";
import Image from "next/image";

const MusicSpotify = () => {
  const emotion: Emotion = Emotion.SAD;

  const {
    data: playlists = [],
    isLoading,
    isError,
  } = useGetAllPlaylistsByQueryQuery(emotion);

  if (isLoading) return <p>로딩 중...</p>;
  if (isError) return <p>에러 발생!</p>;

  return (
    <div>
      <h2>감정 기반 추천 플레이리스트 ({emotion})</h2>
      <ul>
        {playlists?.map((item) => {
          if (!item || !item.id || !item.name) return null;

          return (
            <li key={item.id}>
              <p>{item.name}</p>
              {item.images?.[0]?.url && (
                <Image
                  src={item.images[0].url}
                  alt={`Playlist cover: ${item.name}`}
                  width={200}
                  height={200}
                  style={{ borderRadius: "12px", margin: "10px 0" }}
                />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MusicSpotify;
