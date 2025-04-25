"use client";

import Tab from "@/ui/common/tab.common";
import { useState } from "react";
import ReceivedFriendList from "./components/friend-request-received-friend-list";
import SentFriendList from "./components/friend-request-sent-friend-list";

const Request = () => {
  const tabs = [
    { id: "firstTab", label: "받은 요청" },
    { id: "secondTab", label: "보낸 요청" },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className="min-h-screen space-y-4 border px-4 pb-6">
      <Tab firstTab="받은 요청" secondTab="보낸 요청" activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "firstTab" ? <ReceivedFriendList /> : <SentFriendList />}
    </div>
  );
};

export default Request;
