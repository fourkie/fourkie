import { useGetUserNicknameQuery } from "@/hooks/queries/use-get-user-nickname-query";
import LoadingCookie from "@/ui/common/loading-cookie.common";
import { useEffect, useState } from "react";

const PostingEmotionModalLoading = () => {
  const [dots, setDots] = useState("");
  const { data: nickname } = useGetUserNicknameQuery();

  // 일정 시간마다 loadingText를 변경
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white"
      role="dialog"
      aria-live="assertive"
      aria-labelledby="loading-modal"
    >
      <div className="flex max-w-xs flex-col items-center justify-center gap-[29px] rounded-lg text-xl">
        <LoadingCookie />

        <div className="text-grey-900 text-center">
          <strong>
            <span className="text-primary-500">Smookie</span>가 {nickname}
            님의
            <br />
            기분을 분석중이에요.
          </strong>
        </div>

        <div className="text-grey-900">
          <strong>잠시만 기다려 주세요{dots}</strong>!
        </div>
      </div>
    </div>
  );
};

export default PostingEmotionModalLoading;
