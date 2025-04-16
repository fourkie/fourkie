import { Dispatch, SetStateAction, useState } from "react";
import { PlaylistTabProps, TabButtonProps } from "../type";
import BookmarkedPlaylists from "./bookmarked-playlists";
import RecommendPlaylists from "./recommend-playlists";
import { AudioLines, Star } from "lucide-react";

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
    <div className="flex flex-col gap-4 p-3">
      <div className="flex gap-4 pt-4">
        <TabButton
          isActive={activeTab === PlaylistTabProps.RECOMMEND}
          onClick={() => setActiveTab(PlaylistTabProps.RECOMMEND)}
        >
          <div className="flex items-center gap-2">
            <AudioLines className="h-4" />
            추천 플리
          </div>
        </TabButton>
        <TabButton
          isActive={activeTab === PlaylistTabProps.BOOKMARK}
          onClick={() => setActiveTab(PlaylistTabProps.BOOKMARK)}
        >
          <div className="flex items-center gap-2">
            <Star className="h-4" />
            즐겨찾기
          </div>
        </TabButton>
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

const TabButton = ({ isActive, onClick, children }: TabButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${isActive ? "border-b-2 border-gray-600" : "border-b-2 text-gray-600"}`}
    >
      {children}
    </button>
  );
};

export default PlaylistTabContainer;
