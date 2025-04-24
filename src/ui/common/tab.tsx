import { motion } from "framer-motion";

type TabType = {
  id: string;
  label: string;
};
//tabs 인자로 받아야 함
const Tab = ({
  tabs,
  activeTab,
  setActiveTab,
}: {
  tabs: TabType[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) => {
  return (
    <div className="relative flex justify-center space-x-10">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`relative px-1 py-1.5 font-bold ${tab.id === activeTab ? "text-primary-600" : "text-grey-3"}`}
          style={{
            WebkitTapHighlightColor: "transparent",
          }}
        >
          {tab.label}
          {activeTab === tab.id && (
            <motion.div
              layoutId="underline"
              className="absolute -bottom-0 left-0 right-0 h-[2px] bg-primary-600"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  );
};

export default Tab;
