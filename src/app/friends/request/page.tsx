"use client";

import Tab from "@/ui/common/tab";
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
    <div className="min-h-screen space-y-4 border bg-white px-4 py-6 pt-20">
      <Tab tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "firstTab" ? <ReceivedFriendList /> : <SentFriendList />}
    </div>
  );
};

export default Request;
