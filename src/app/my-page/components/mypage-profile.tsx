"use client";

import EMOTION_COOKIE_IMAGE_URL from "@/constants/emotions-url.constant";
import { QUERY_KEY } from "@/constants/query-keys.constant";
import { TOAST_MESSAGE } from "@/constants/toast-message.constant";
import { useUpdateNicknameMutation } from "@/hooks/mutations/use-update-nickname-mutation";
import { useGetUserNicknameQuery } from "@/hooks/queries/use-get-user-nickname-query";
import { checkNicknameDuplicate } from "@/services/nickname-service";
import EmotionImage from "@/ui/common/emotion-image.common";
import Input from "@/ui/common/input.common";
import { useQueryClient } from "@tanstack/react-query";
import { SquareCheckBig, SquarePen } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

const MypageProfile = ({ userId }: { userId: string }) => {
  const { data: nickname, isPending } = useGetUserNicknameQuery();
  const { mutate: updateNickname } = useUpdateNicknameMutation({ userId });
  const [edit, setEdit] = useState(false);
  const [newNickname, setNewNickname] = useState(nickname);
  const queryClient = useQueryClient();

  const handleEditToggle = () => {
    setEdit((prev) => !prev);
    setNewNickname(nickname);
  };

  const handleUpdateNickname = async () => {
    if (!newNickname.trim()) {
      toast.error(TOAST_MESSAGE.MYPAGE.SUBMIT_NICKNAME_INFO);
      return;
    }

    if (newNickname === nickname) {
      toast.error(TOAST_MESSAGE.MYPAGE.SAME_NICKNAME_ERROR);
      return;
    }

    const isDuplicate = await checkNicknameDuplicate(newNickname);
    if (isDuplicate) {
      toast.error(TOAST_MESSAGE.MYPAGE.EXIST_NICKNAME_ERROR);
      return;
    }

    updateNickname(newNickname, {
      onSuccess: () => {
        toast.success(TOAST_MESSAGE.MYPAGE.CHANGE_NICKNAME_SUCCESS);
        setEdit(false);
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.NICKNAME],
        });
      },
    });
  };

  if (isPending) return <div>쿠키 주문하신 분?</div>;

  return (
    <div className="w-full rounded-2xl border border-primary-50 bg-white py-5 md:flex md:h-56 md:w-96 md:items-center md:justify-center">
      <div className="flex flex-col items-center gap-2">
        <EmotionImage src={EMOTION_COOKIE_IMAGE_URL.JOY} size="m" />
        <div className="flex h-10 items-center justify-center gap-2">
          {edit ? (
            <Input
              className="mt-6 flex h-10 w-20 rounded-xl bg-grey-0 text-center"
              value={newNickname}
              onChange={(e) => setNewNickname(e.target.value)}
            />
          ) : (
            <strong className="flex items-center justify-center text-xl text-grey-8">
              {nickname}
            </strong>
          )}
          <button
            onClick={edit ? handleUpdateNickname : handleEditToggle}
            disabled={isPending}
            className="flex items-center justify-center"
          >
            {edit ? <SquareCheckBig size={20} /> : <SquarePen size={20} />}
          </button>
        </div>
        {!edit && (
          <strong className="text-sm text-[#818181]">나의 프로필</strong>
        )}
      </div>
    </div>
  );
};

export default MypageProfile;
