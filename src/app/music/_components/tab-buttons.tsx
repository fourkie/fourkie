import { BOOKMARK, RECOMMEND } from "@/constants/music-constant";
import { TabButtonProps, TabButtonsProps } from "../type";

export const TabButtons = ({ activeTab, onTabChange }: TabButtonsProps) => {
  return (
    <div className="flex gap-4">
      <TabButton
        isActive={activeTab === RECOMMEND}
        onClick={() => onTabChange(RECOMMEND)}
      >
        추천 플리
      </TabButton>
      <TabButton
        isActive={activeTab === BOOKMARK}
        onClick={() => onTabChange(BOOKMARK)}
      >
        즐겨찾기
      </TabButton>
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
