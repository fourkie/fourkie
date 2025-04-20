"use client";

import { useState } from "react";
import ReceivedFriendList from "./components/friend-request-received-friend-list";
import SentFriendList from "./components/friend-request-sent-friend-list";

const Request = () => {
  const [tab, setTab] = useState<"received" | "sent">("received");

  return (
    <div className="min-h-screen space-y-4 border bg-white px-4 py-6">
      <div className="flex w-full items-center justify-center gap-10">
        <button
          onClick={() => setTab("received")}
          className={`px-4 py-2 ${
            tab === "received"
              ? "border-b-2 border-grey-5 font-semibold text-grey-6"
              : "text-grey-3"
          }`}
        >
          받은 요청
        </button>
        <button
          onClick={() => setTab("sent")}
          className={`px-4 py-2 ${
            tab === "sent"
              ? "border-b-2 border-grey-5 font-semibold text-grey-6"
              : "text-grey-3"
          }`}
        >
          보낸 요청
        </button>
      </div>
      {tab === "received" ? <ReceivedFriendList /> : <SentFriendList />}
    </div>
  );
};

export default Request;
