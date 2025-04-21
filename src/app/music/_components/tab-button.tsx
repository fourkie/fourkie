import { PlaylistTabProps, TabButtonProps } from "../type";

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

export default TabButton;
