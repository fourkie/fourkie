"use client";

import { usePathname, useRouter } from "next/navigation";

const HomeHeader = ({ nickname }: { nickname: string | undefined }) => {
  /* const HomeHeader = () => { */
  const pathname = usePathname();
  const route = useRouter();

  if (pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up")) {
    return null;
  }

  const handlePlus = () => {
    route.push("/posting");
  };
  return (
    <div className="flex flex-row items-center justify-between bg-primary-50 p-3">
      <div className="text-2xl mx-auto">{nickname}님</div>
      {/* <div className="text-2xl mx-auto">두두님</div> */}
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
