import { AudioLines, Star } from "lucide-react";
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
    <div className="flex flex-col gap-[12px] px-[20px]">
      <div className="flex items-center justify-center gap-[28px] pt-4">
        <TabButton
          isActive={activeTab === PlaylistTabProps.RECOMMEND}
          onClick={() => setActiveTab(PlaylistTabProps.RECOMMEND)}
        >
          <div className="flex items-center gap-[6px] text-[16px]">
            <AudioLines className="h-[18px]" />
            추천 플리
          </div>
        </TabButton>
        <TabButton
          isActive={activeTab === PlaylistTabProps.BOOKMARK}
          onClick={() => setActiveTab(PlaylistTabProps.BOOKMARK)}
        >
          <div className="flex items-center gap-[6px] text-[16px]">
            <Star className="h-[18px]" />
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
