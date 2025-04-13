"use client";

import { useState } from "react";
import Image from "next/image";
import { useGetAllPlaylistsByQueryQuery } from "@/hooks/queries/use-get-all-playlists-by-query-query";
import { Emotion, EMOTION_DISPLAY_NAME } from "@/constants/spotify.constant";
import { TOAST_MESSAGE } from "@/constants/toast-message.constant";
import { QUERYDATA } from "@/constants/query-data.constant";

const Music = () => {
  const [query, setQuery] = useState(Emotion.JOY);
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
          onChange={(e) => setQuery(e.target.value as Emotion)}
          className="p-2 border rounded mt-4"
        >
          <option value={Emotion.JOY}>{EMOTION_DISPLAY_NAME.JOY}</option>
          <option value={Emotion.EXCITED}>
            {EMOTION_DISPLAY_NAME.EXCITED}
          </option>
          <option value={Emotion.BUTTERFLY}>
            {EMOTION_DISPLAY_NAME.BUTTERFLY}
          </option>
          <option value={Emotion.GRATEFUL}>
            {EMOTION_DISPLAY_NAME.GRATEFUL}
          </option>
          <option value={Emotion.CALM}>{EMOTION_DISPLAY_NAME.CALM}</option>
          <option value={Emotion.LONELY}>{EMOTION_DISPLAY_NAME.LONELY}</option>
          <option value={Emotion.ANXIOUS}>
            {EMOTION_DISPLAY_NAME.ANXIOUS}
          </option>
          <option value={Emotion.TIRED}>{EMOTION_DISPLAY_NAME.TIRED}</option>
          <option value={Emotion.SAD}>{EMOTION_DISPLAY_NAME.SAD}</option>
          <option value={Emotion.ANGRY}>{EMOTION_DISPLAY_NAME.ANGRY}</option>
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
