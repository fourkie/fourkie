"use client";

import { useRouter } from "next/navigation";

const HomeHeader = ({ nickname }: { nickname: string | undefined }) => {
  const route = useRouter();
  const handlePlus = () => {
    route.push("/posting");
  };
  return (
    <div className="flex flex-row items-center justify-between bg-green-300 p-3">
      <div className="text-2xl mx-auto">{nickname}님</div>
      <div
        className="text-3xl font-bold cursor-pointer text-white hover:text-red-200"
        onClick={handlePlus}
      >
        +
      </div>
    </div>
  );
};

export default HomeHeader;
