"use client";

import { useGetUserNicknameQuery } from "@/hooks/queries/use-get-user-nickname-query";
import createClient from "@/services/supabase-client-service";
import { HeartHandshake } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import FriendList from "./components/friend-list";
import FriendRequestButton from "./components/friend-request-button";
import FriendRequestPopUp from "./components/friend-request-popup";
import FriendsSearchInput from "./components/friend-search-input";
import { SelectedUserType } from "./type";

const Friends = () => {
  useEffect(() => {
    const checkUser = async () => {
      const supabaseServer = createClient();

      const { data, error } = await supabaseServer.auth.getUser();

      if (error || !data?.user) {
        redirect("/sign-in");
      }
    };

    checkUser();
  }, []);

  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedUser, setSelectedUser] = useState<SelectedUserType | null>(
    null,
  );
  const { data: nickname, error } = useGetUserNicknameQuery();

  return (
    <div className="min-h-screen space-y-4 bg-white px-4 py-6 pt-20">
      {/* 유저 검색창 */}
      <FriendsSearchInput
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
      />
      {/* 요청 페이지 */}
      <FriendRequestButton />
      {/* 로그인한 사용자 닉네임 */}
      <div className="flex items-center gap-2 px-2 text-lg font-semibold text-grey-7">
        <HeartHandshake className="h-5 w-5 text-grey-7" />
        {error ? "닉네임 없음" : (nickname ?? "유저 이름")}
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
