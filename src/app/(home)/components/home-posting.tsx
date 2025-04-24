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
      className="flex cursor-pointer flex-row justify-end py-2"
      onClick={() => {
        if (today && today.length > 0) {
          toast.warning(TOAST_MESSAGE.POST.TODAY.EXISTS);
          return;
        }
        route.push("/posting");
      }}
    >
      <CirclePlus className="h-1.5rem w-1.5rem text-secondary-400" />
      <div className="my-auto font-bold text-primary-600">
        오늘 기록 남기러 가기
      </div>
    </div>
  );
};

export default HomePosting;
