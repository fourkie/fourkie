"use client";

import { useState } from "react";
import ReceivedFriendList from "./components/friend-request-received-friend-list";
import SentFriendList from "./components/friend-request-sent-friend-list";

const Request = () => {
  const [tab, setTab] = useState<"received" | "sent">("received");

  return (
    <div className="border min-h-screen bg-white px-4 py-6 space-y-4">
      <div className="w-full flex justify-center items-center gap-10">
        <button
          onClick={() => setTab("sent")}
          className={`px-4 py-2 ${
            tab === "sent"
              ? "border-grey-5 border-b-2 font-semibold text-grey-6"
              : "text-grey-3"
          }`}
        >
          보낸 요청
        </button>
        <button
          onClick={() => setTab("received")}
          className={`px-4 py-2 ${
            tab === "received"
              ? "border-grey-5 border-b-2 font-semibold text-grey-6"
              : "text-grey-3"
          }`}
        >
          받은 요청
        </button>
      </div>
      {tab === "received" ? <ReceivedFriendList /> : <SentFriendList />}
    </div>
  );
};

export default Request;
