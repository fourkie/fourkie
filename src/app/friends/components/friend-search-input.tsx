"use client";

import { FORM_MESSAGE } from "@/constants/form-message.constant";
import { Search } from "lucide-react";
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
    <div className="w-full relative">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-grey-3 w-5 h-5" />
      <input
        type="text"
        value={searchKeyword}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={FORM_MESSAGE.PLACEHOLDER_USER_SEARCH}
        className="w-full h-12 pl-12 pr-4 py-2 rounded-2xl bg-grey-0 text-sm border-none placeholder:text-grey-3"
      />
    </div>
  );
};

export default FriendSearchInput;
