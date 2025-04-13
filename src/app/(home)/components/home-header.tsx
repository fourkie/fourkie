"use client";

import { useGetUserNicknameByIdQuery } from "@/hooks/queries/use-get-user-nickname-by-id-query";
import { usePathname, useRouter } from "next/navigation";

const HomeHeader = ({ userId }: { userId: string | undefined }) => {
  const pathname = usePathname();
  const route = useRouter();

  const { data: user } = useGetUserNicknameByIdQuery(userId);

  if (pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up")) {
    return null;
  }

  if (!user) {
    return null;
  }

  const handlePlus = () => {
    route.push("/posting");
  };
  return (
    <div className="flex flex-row items-center justify-between bg-primary-50 p-3">
      <div className="text-2xl mx-auto">{user.user_nickname}님</div>
      <div
        className="text-3xl font-bold cursor-pointer text-white hover:text-secondary-200"
        onClick={handlePlus}
      >
        +
      </div>
    </div>
  );
};

export default HomeHeader;
