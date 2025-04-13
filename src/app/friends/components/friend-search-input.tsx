"use client";

import { FriendSearchInputProps } from "../type";

const FriendSearchInput = ({
  searchKeyword,
  setSearchKeyword,
}: FriendSearchInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log(searchKeyword);
    }
  };

  return (
    <div className="w-full">
      <input
        type="text"
        value={searchKeyword}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="이메일 또는 닉네임으로 친구 검색하기"
        className="border-none w-full h-12 px-4 py-2 rounded-xl bg-grey-0 text-sm"
      />
    </div>
  );
};

export default FriendSearchInput;
