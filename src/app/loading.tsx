import LoadingCookie from "@/ui/common/loading-cookie.common";

const Loading = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <LoadingCookie />
      <strong className="mt-10 text-xl">로딩중이에요 !</strong>
      <div className="grey-5 mt-2">잠시만 기다려주세요.</div>
    </div>
  );
};

export default Loading;
