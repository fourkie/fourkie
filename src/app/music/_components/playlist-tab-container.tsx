import { PlaylistTabContainerProps, PlaylistTabProps } from "../type";
import PlaylistContent from "./playlist-content";
import TabButton from "./tab-button";

const PlaylistTabContainer = ({
  userId,
  emotion,
  activeTab,
  onTabChange,
}: PlaylistTabContainerProps) => {
  return (
    <div className="absolute left-0 top-0 z-30 flex w-full flex-col">
      <strong className="sticky left-0 top-40 z-30 flex items-center justify-center gap-10 bg-white p-4 text-sm md:top-52">
        <TabButton
          isActive={activeTab === PlaylistTabProps.RECOMMEND}
          onClick={() => onTabChange(PlaylistTabProps.RECOMMEND)}
          activeTab={activeTab}
        >
          <div className="flex items-center">추천 플리</div>
        </TabButton>
        <TabButton
          isActive={activeTab === PlaylistTabProps.BOOKMARK}
          onClick={() => onTabChange(PlaylistTabProps.BOOKMARK)}
          activeTab={activeTab}
        >
          <div className="flex items-center">즐겨찾기</div>
        </TabButton>
      </strong>

      <PlaylistContent
        userId={userId}
        activeTab={activeTab}
        emotion={emotion}
      />
    </div>
  );
};

export default PlaylistTabContainer;
