//커스텀훅
"use client";

import { useGetUserNicknameByIdQuery } from "../queries/use-get-user-nickname-by-id-query";

export const useRefreshHeader = (userId: string | undefined) => {
  const {
    data: nicknameData,
    isLoading,
    isError,
  } = useGetUserNicknameByIdQuery(userId, {
    enabled: Boolean(userId),
    // 언디파인드일 경우 막기
  });

  return {
    nickname: nicknameData?.user_nickname ?? null,
    //앞이 언디파인드인 경우 null 반환하기
    loading: isLoading,
    isLoggedIn: !!userId,
    isError,
  };
};
