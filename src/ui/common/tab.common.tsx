const Tab = ({
  firstTab,
  secondTab,
  activeTab,
  setActiveTab,
}: {
  firstTab: string;
  secondTab: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) => {
  const tabs = [
    { id: "firstTab", label: firstTab },
    { id: "secondTab", label: secondTab },
  ];

  return (
    <div className="relative flex justify-center gap-10 py-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`relative px-3 pb-[6px] ${
            tab.id === activeTab ? "text-primary-600" : "text-grey-3"
          }`}
          style={{
            WebkitTapHighlightColor: "transparent",
          }}
        >
          <strong>
            {tab.label}
            <span
              className={`absolute bottom-0 left-0 right-0 h-[2px] bg-primary-600 transition-all duration-300 ease-in-out ${
                tab.id === activeTab ? "scale-x-100" : "scale-x-0"
              }`}
            />
          </strong>
        </button>
      ))}
    </div>
  );
};

export default Tab;
