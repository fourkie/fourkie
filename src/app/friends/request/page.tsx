"use client";

import { useState } from "react";

const Request = () => {
  const [tab, setTab] = useState<"received" | "sent">("received");

  return (
    <div className="min-h-screen bg-white px-4 py-6 space-y-4">
      <div className="border-b border-grey-1 flex justify-center gap-6 pb-2">
        <button
          onClick={() => setTab("received")}
          className={`px-4 py-2 ${
            tab === "received" ? "font-semibold text-grey-5" : "text-grey-3"
          }`}
        >
          받은 요청
        </button>
        <button
          onClick={() => setTab("sent")}
          className={`px-4 py-2 ${
            tab === "sent" ? "font-semibold text-grey-5" : "text-grey-3"
          }`}
        >
          보낸 요청
        </button>
      </div>
    </div>
  );
};

export default Request;
