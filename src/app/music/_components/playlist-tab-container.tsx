import { Dispatch, SetStateAction, useState } from "react";
import { PlaylistTabProps, TabButtonProps } from "../type";
import BookmarkedPlaylists from "./bookmarked-playlists";
import RecommendPlaylists from "./recommend-playlists";

const PlaylistTabContainer = ({
  userId,
  emotion,
}: {
  userId: string;
  emotion: string;
  activeTab?: PlaylistTabProps;
  onTabChange?: Dispatch<SetStateAction<PlaylistTabProps>>;
}) => {
  const [activeTab, setActiveTab] = useState<PlaylistTabProps>(
    PlaylistTabProps.RECOMMEND,
  );

  return (
    <div>
      <div className="flex gap-4">
        <TabButton
          isActive={activeTab === PlaylistTabProps.RECOMMEND}
          onClick={() => setActiveTab(PlaylistTabProps.RECOMMEND)}
        >
          추천 플리
        </TabButton>
        <TabButton
          isActive={activeTab === PlaylistTabProps.BOOKMARK}
          onClick={() => setActiveTab(PlaylistTabProps.BOOKMARK)}
        >
          즐겨찾기
        </TabButton>
      </div>

      <div className="mt-4">
        {activeTab === PlaylistTabProps.RECOMMEND ? (
          <RecommendPlaylists userId={userId} emotion={emotion} />
        ) : (
          <BookmarkedPlaylists userId={userId} />
        )}
      </div>
    </div>
  );
};

const TabButton = ({ isActive, onClick, children }: TabButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded transition-colors duration-200 ${
        isActive ? "bg-black text-white" : "bg-gray-200 text-gray-600"
      }`}
    >
      {children}
    </button>
  );
};

export default PlaylistTabContainer;
