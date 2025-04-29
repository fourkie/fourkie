"use client";

import { useGetUserNicknameQuery } from "@/hooks/queries/use-get-user-nickname-query";
import createClient from "@/services/supabase-client-service";
import { HeartHandshake } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FriendList from "./components/friend-list";
import FriendRequestButton from "./components/friend-request-button";
import FriendRequestPopUp from "./components/friend-request-popup";
import FriendsSearchInput from "./components/friend-search-input";
import { SelectedUserType } from "./type";

const Friends = () => {
  const router = useRouter();
  const supabaseClient = createClient();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
        error,
      } = await supabaseClient.auth.getUser();
      if (error || !user) {
        router.replace("/sign-in");
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
    <div className="bg-white">
      <FriendsSearchInput
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
      />

      <FriendRequestButton />

      <div className="flex items-center gap-2 text-lg font-semibold text-grey-7">
        <HeartHandshake className="h-5 w-5 text-grey-7" />
        {error ? "닉네임 없음" : (nickname ?? "유저 이름")}
      </div>

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
