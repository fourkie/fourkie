import { TabButtonsProps } from "../type";

export const TabButtons = ({ isTab, onTabChange }: TabButtonsProps) => {
  return (
    <div className="flex gap-4">
      <button
        onClick={() => onTabChange("recommend")}
        className={`px-4 py-2 rounded ${
          isTab === "recommend"
            ? "bg-black text-white"
            : "bg-gray-200 text-gray-600"
        }`}
      >
        추천 플리
      </button>
      <button
        onClick={() => onTabChange("bookmark")}
        className={`px-4 py-2 rounded ${
          isTab === "bookmark"
            ? "bg-black text-white"
            : "bg-gray-200 text-gray-600"
        }`}
      >
        즐겨찾기
      </button>
    </div>
  );
};
