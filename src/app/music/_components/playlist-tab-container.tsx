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
    <div className="flex flex-col gap-3 px-5">
      <div className="my-2 flex items-center justify-center gap-10 pt-4 text-sm font-bold">
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

const TabButton = ({
  isActive,
  onClick,
  children,
  activeTab,
}: TabButtonProps) => {
  const isRecommend = activeTab === PlaylistTabProps.RECOMMEND;
  const isBookmark = activeTab === PlaylistTabProps.BOOKMARK;

  const baseStyle = "border-b-2";
  const recommendActiveStyle = "text-primary-600 border-primary-600";
  const bookmarkActiveStyle = "text-secondary-200 border-secondary-200";
  const unselectedStyle = "text-grey-4 border-transparent";

  const activeStyle = isRecommend
    ? recommendActiveStyle
    : isBookmark
      ? bookmarkActiveStyle
      : "";

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${isActive ? activeStyle : unselectedStyle}`}
    >
      {children}
    </button>
  );
};

export default PlaylistTabContainer;
