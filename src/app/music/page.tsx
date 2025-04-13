"use client";

import { useState } from "react";
import Image from "next/image";
import { useGetAllPlaylistsByQueryQuery } from "@/hooks/queries/use-get-all-playlists-by-query-query";
import { Emotion } from "@/constants/spotify.constant";
import { TOAST_MESSAGE } from "@/constants/toast-message.constant";
import { QUERYDATA } from "@/constants/query-data.constant";

const Music = () => {
  const [query, setquery] = useState("happy");
  const { playlists, tokenPending, playlistsPending, playlistsError } =
    useGetAllPlaylistsByQueryQuery(query);

  if (tokenPending || playlistsPending) {
    return QUERYDATA.ISPENDING;
  }

  if (playlistsError) {
    return QUERYDATA.ISERROR;
  }

  if (!playlists || playlists.length === 0) {
    return TOAST_MESSAGE.SPOTIFY.PLAYLISTS_ERROR;
  }

  return (
    <div>
      <div className="mb-4">
        <select
          value={query}
          onChange={(e) => setquery(e.target.value)}
          className="p-2 border rounded mt-4"
        >
          <option value={Emotion.JOY}>JOY</option>
          <option value={Emotion.EXCITED}>EXCITED</option>
          <option value={Emotion.BUTTERFLY}>BUTTERFLY</option>
          <option value={Emotion.GRATEFUL}>GRATEFUL</option>
          <option value={Emotion.CALM}>CALM</option>
          <option value={Emotion.LONELY}>LONELY</option>
          <option value={Emotion.ANXIOUS}>ANXIOUS</option>
          <option value={Emotion.TIRED}>TIRED</option>
          <option value={Emotion.SAD}>SAD</option>
          <option value={Emotion.ANGRY}>ANGRY</option>
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
