"use client";

import { QUERYDATA } from "@/constants/query-data.constant";
import { Emotion } from "@/constants/spotify.constant";
import { TOAST_MESSAGE } from "@/constants/toast-message.constant";
import { useGetAllPlaylistsByQueryQuery } from "@/hooks/queries/use-get-all-playlists-by-query-query";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import EmotionSelect from "./_components/emotion-select";

const Music = () => {
  const [query, setQuery] = useState(Emotion.JOY);
  const { playlists, playlistsPending, playlistsError } =
    useGetAllPlaylistsByQueryQuery(query);

  useEffect(() => {
    if (playlistsError) {
      toast.warning(
        playlistsError.message || TOAST_MESSAGE.SPOTIFY.PLAYLISTS_ERROR,
      );
    }
  }, [playlistsError]);

  if (playlistsPending) {
    return QUERYDATA.ISPENDING;
  }

  if (!playlists || playlists.length === 0) {
    return TOAST_MESSAGE.SPOTIFY.PLAYLISTS_ERROR;
  }

  return (
    <div>
      <div className="mb-4">
        <EmotionSelect value={query} onChange={setQuery} />
      </div>
      <ul>
        {playlists.map((playlist) => (
          <li
            key={playlist.id}
            className="flex items-center justify-start gap-4 mb-4"
          >
            <Image
              src={
                playlist.images && playlist.images.length > 0
                  ? playlist.images[0].url
                  : "/default-image.jpg"
              }
              alt={playlist.name}
              width={50}
              height={50}
            />
            <p>{playlist.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Music;
