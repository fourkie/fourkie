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
      className="mx-auto mb-2 flex max-w-[353px] cursor-pointer flex-row justify-end gap-4 py-2 md:max-w-[1024px]"
      role="button"
      aria-label="오늘 감정 기록 작성 페이지로 이동"
      onClick={() => {
        if (today && today.length > 0) {
          toast.warning(TOAST_MESSAGE.POST.TODAY.EXISTS);
          return;
        }
        route.push("/posting");
      }}
    >
      <CirclePlus className="h-1.5rem w-1.5rem text-secondary-400" />
      <strong className="my-auto text-primary-600 transition-all duration-300 hover:text-secondary-400">
        오늘 기록 남기러 가기
      </strong>
    </div>
  );
};

export default HomePosting;
