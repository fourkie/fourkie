"use client";

import { useEffect, useState } from "react";
import FriendsSearchInput from "./components/friend-search-input";
import FriendList from "./components/friend-list";
import { SelectedUserType } from "./type";
import FriendRequestButton from "./components/friend-request-button";
import FriendRequestPopUp from "./components/friend-request-popup";
import { HeartHandshake } from "lucide-react";
import { useGetUserNicknameQuery } from "@/hooks/queries/use-get-user-nickname-query";

const Friends = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedUser, setSelectedUser] = useState<SelectedUserType | null>(
    null,
  );
  const { data: nickname, error } = useGetUserNicknameQuery();

  return (
    <div className="min-h-screen bg-white px-4 py-6 space-y-6">
      {/* 유저 검색창 */}
      <FriendsSearchInput
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
      />
      {/* 요청 페이지 */}
      <FriendRequestButton />
      {/* 로그인한 사용자 닉네임 */}
      <div className="flex items-center gap-2 text-lg text-grey-7 font-semibold px-2">
        <HeartHandshake className="w-5 h-5 text-grey-7" />
        {error ? "닉네임 없음" : nickname ?? "유저 이름"}
      </div>
      {/* 친구 목록 */}
      <FriendList
        searchUser={searchKeyword}
        setSelectedUser={setSelectedUser}
      />
      {selectedUser && (
        <FriendRequestPopUp
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
};

export default Friends;
