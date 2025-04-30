"use client";

import { TOAST_MESSAGE } from "@/constants/toast-message.constant";
import { useGetPostTodayEmotionByIdQuery } from "@/hooks/queries/use-get-posts-today-emotion-by-id-query";
import { CirclePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const HomePosting = ({ userId }: { userId: string }) => {
  const { data: today } = useGetPostTodayEmotionByIdQuery(userId);
  const route = useRouter();
  return (
    <div
      role="button"
      aria-label="오늘 감정 기록 작성 페이지로 이동"
      className="mx-auto mb-2 flex max-w-[353px] cursor-pointer flex-row items-center justify-end gap-2 transition-all duration-300 hover:gap-3 md:max-w-[1024px]"
      onClick={() => {
        if (today && today.length > 0) {
          toast.warning(TOAST_MESSAGE.POST.TODAY.EXISTS);
          return;
        }
        route.push("/posting");
      }}
    >
      <CirclePlus className="h-1.5rem w-1.5rem text-secondary-400" />
      <strong className="my-auto py-2 pr-3 text-primary-600 transition-all duration-300 ease-in-out hover:scale-105 hover:text-secondary-300 md:text-lg">
        오늘 기록 남기러 가기
      </strong>
    </div>
  );
};

export default HomePosting;
