import Link from "next/link";

const Navigation = () => {
  return (
    <div className="flex justify-evenly items-center text-black fixed bottom-0 w-full h-[106px] pb-[34px] rounded-t-[28px] bg-white shadow-md">
      <Link href="/">홈</Link>
      <Link href="/list">리스트</Link>
      <Link href="/music">음악</Link>
      <Link href="my-page">마이페이지</Link>
    </div>
  );
};

export default Navigation;
