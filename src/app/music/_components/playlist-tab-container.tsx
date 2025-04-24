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
    <div className="flex flex-col gap-3 px-5">
      <strong className="fixed left-1/2 top-64 z-50 flex min-w-[393px] -translate-x-1/2 transform items-center justify-center gap-10 bg-white py-2 pt-4 text-sm lg:w-full lg:min-w-0">
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
