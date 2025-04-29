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
    <div className="relative w-full">
      <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transform text-grey-3" />
      <input
        type="text"
        value={searchKeyword}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={FORM_MESSAGE.PLACEHOLDER_USER_SEARCH}
        className="h-12 w-full rounded-2xl border-none bg-grey-0 py-2 pl-12 pr-4 text-sm placeholder:text-grey-3"
      />
    </div>
  );
};

export default FriendSearchInput;
