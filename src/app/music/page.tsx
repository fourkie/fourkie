"use client";

import { useState } from "react";
import Image from "next/image";
import { useGetAllPlaylistsByQueryQuery } from "@/hooks/queries/use-get-all-playlists-by-query-query";
import { Emotion } from "@/constants/spotify.constant";
import { TOAST_MESSAGE } from "@/constants/toast-message.constant";

const Music = () => {
  const [searchTerm, setSearchTerm] = useState("happy");
  const { playlists, tokenPending, playlistsPending, playlistsError } =
    useGetAllPlaylistsByQueryQuery(searchTerm);

  if (tokenPending || playlistsPending) {
    return TOAST_MESSAGE.SPOTIFY.DATA_PENDING;
  }

  if (playlistsError) {
    return TOAST_MESSAGE.SPOTIFY.DATA_ERROR;
  }

  if (!playlists || playlists.length === 0) {
    return TOAST_MESSAGE.SPOTIFY.PLAYLISTS_ERROR;
  }

  return (
    <div>
      <div className="mb-4">
        <select
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded mt-4"
        >
          <option value={Emotion.HAPPY}>Happy</option>
          <option value={Emotion.SAD}>Sad</option>
          <option value={Emotion.ANGRY}>Angry</option>
          <option value={Emotion.CALM}>Calm</option>
          <option value={Emotion.FOCUS}>Focus</option>
        </select>
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
