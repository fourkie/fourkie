"use client";

import EMOTION_COOKIE_IMAGE_URL from "@/constants/emotions-url.constant";
import EmotionImage from "@/ui/common/emotion-image.common";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const GlobalError = () => {
  const router = useRouter();

  return (
    <div className="flex h-full flex-col items-center justify-center pb-5 text-center">
      <motion.div
        animate={{
          rotate: [0, -15, 20, -25, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      >
        <EmotionImage src={EMOTION_COOKIE_IMAGE_URL.SAD} size="l" />
      </motion.div>
      <div className="mt-7 text-xl font-bold">
        일시적인 오류가 발생했어요. <br /> 빠르게 복구시킬게요 !
      </div>
      <div className="grey-5 mt-5">
        잠시 후 다시 시도하거나, 홈으로 이동해주세요.
      </div>

      <button
        onClick={() => router.push("/")}
        className="mt-[38px] w-full max-w-[313px] rounded-2xl bg-primary-400 py-[10px] text-white shadow-md"
      >
        <strong>홈으로 가기</strong>
      </button>
    </div>
  );
};

export default GlobalError;
