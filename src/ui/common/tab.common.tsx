const Tab = ({
  firstTab,
  secondTab,
  activeTab,
  setActiveTab,
  isPink = false,
}: {
  firstTab: string;
  secondTab: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isPink?: boolean;
}) => {
  const tabs = [
    { id: "firstTab", label: firstTab },
    { id: "secondTab", label: secondTab },
  ];

  return (
    <div
      className="relative flex justify-center gap-10 py-2 text-sm md:text-lg"
      role="tablist"
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={tab.id === activeTab}
          aria-controls={`${tab.id}-panel`}
          id={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`relative px-3 pb-[6px] ${
            tab.id === activeTab
              ? isPink && secondTab === tab.label
                ? "text-secondary-200"
                : "text-primary-600"
              : "text-grey-3 hover:text-grey-4"
          }`}
          style={{
            WebkitTapHighlightColor: "transparent",
          }}
        >
          <strong>
            {tab.label}
            <span
              className={`absolute bottom-0 left-0 right-0 h-[2px] transition-all duration-300 ease-in-out ${
                tab.id === activeTab ? "scale-x-100" : "scale-x-0"
              } ${
                tab.id === activeTab
                  ? isPink && secondTab === tab.label
                    ? "bg-secondary-200"
                    : "bg-primary-600"
                  : "bg-grey-3 hover:text-grey-4"
              }`}
            />
          </strong>
        </button>
      ))}
    </div>
  );
};

export default Tab;
