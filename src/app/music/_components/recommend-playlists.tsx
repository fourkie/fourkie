import { useGetAllPlaylistsByQueryQuery } from "@/hooks/queries/use-get-all-playlists-by-query-query";
import { Emotion } from "@/constants/spotify.constant";
import { useState } from "react";
import PlaylistCard from "./playlist-card";

const RecommendPlaylists = ({ userId }: { userId: string }) => {
  const [emotion, setEmotion] = useState(Emotion.JOY);
  const { playlists, playlistsPending } =
    useGetAllPlaylistsByQueryQuery(emotion);

  console.log(setEmotion);

  if (playlistsPending) return <p>로딩 중...</p>;

  return (
    <ul className="flex flex-col gap-4">
      {playlists.map((playlist) => (
        <PlaylistCard
          key={playlist.id}
          userId={userId}
          playlist={playlist}
          // isBookmarked={false} // 추천 탭이므로 북마크 여부는 따로 로직 추가 가능
          // onBookmarkToggle={() => console.log("북마크 토글")}
        />
      ))}
    </ul>
  );
};

export default RecommendPlaylists;
