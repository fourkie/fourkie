"use client";

import { useState } from "react";
import FriendsSearchInput from "./components/friend-search-input";
import FriendRequest from "./components/friend-request";
import FriendList from "./components/friend-list";

const Friends = () => {
  const [searchKeyword, setSearchKeyword] = useState("");

  return (
    <div className="min-h-screen bg-white px-4 py-6 space-y-6">
      <FriendsSearchInput
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
      />
      <FriendRequest />
      {/* 로그인한 사용자 닉네임 */}
      <FriendList searchUser={searchKeyword} />
    </div>
  );
};

export default Friends;
