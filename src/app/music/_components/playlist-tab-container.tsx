import { Emotion } from "@/constants/spotify.constant";
import { Dispatch, SetStateAction, useState } from "react";
import { PlaylistTabProps } from "../type";
import BookmarkedPlaylists from "./bookmarked-playlists";
import RecommendPlaylists from "./recommend-playlists";
import TabButton from "./tab-button";

const PlaylistTabContainer = ({
  userId,
  emotion,
}: {
  userId: string;
  emotion: keyof typeof Emotion;
  activeTab?: PlaylistTabProps;
  onTabChange?: Dispatch<SetStateAction<PlaylistTabProps>>;
}) => {
  const [activeTab, setActiveTab] = useState<PlaylistTabProps>(
    PlaylistTabProps.RECOMMEND,
  );

  return (
    <div className="flex flex-col gap-3 px-5">
      <div>
        <div className="fixed left-1/2 top-64 z-50 flex min-w-[393px] -translate-x-1/2 transform items-center justify-center gap-10 bg-white py-2 pt-4 text-sm font-bold lg:w-full lg:min-w-0">
          <TabButton
            isActive={activeTab === PlaylistTabProps.RECOMMEND}
            onClick={() => setActiveTab(PlaylistTabProps.RECOMMEND)}
            activeTab={activeTab}
          >
            <div className="flex items-center">추천 플리</div>
          </TabButton>
          <TabButton
            isActive={activeTab === PlaylistTabProps.BOOKMARK}
            onClick={() => setActiveTab(PlaylistTabProps.BOOKMARK)}
            activeTab={activeTab}
          >
            <div className="flex items-center">즐겨찾기</div>
          </TabButton>
        </div>
      </div>
      <div>
        {activeTab === PlaylistTabProps.RECOMMEND ? (
          <RecommendPlaylists userId={userId} emotion={emotion} />
        ) : (
          <BookmarkedPlaylists userId={userId} />
        )}
      </div>
    </div>
  );
};

export default PlaylistTabContainer;
