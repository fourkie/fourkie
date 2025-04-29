"use client";

import EMOTION_COOKIE_IMAGE_URL from "@/constants/emotions-url.constant";
import { QUERY_KEY } from "@/constants/query-keys.constant";
import { TOAST_MESSAGE } from "@/constants/toast-message.constant";
import { useUpdateNicknameMutation } from "@/hooks/mutations/use-update-nickname-mutation";
import { useGetUserNicknameQuery } from "@/hooks/queries/use-get-user-nickname-query";
import { checkNicknameDuplicate } from "@/services/nickname-service";
import EmotionImage from "@/ui/common/emotion-image.common";
import { useQueryClient } from "@tanstack/react-query";
import { SquareCheckBig, SquarePen, X } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

const MypageProfile = ({ userId }: { userId: string }) => {
  const { data: nickname, isPending } = useGetUserNicknameQuery();
  const { mutate: updateNickname } = useUpdateNicknameMutation({ userId });
  const [edit, setEdit] = useState(false);
  const [newNickname, setNewNickname] = useState(nickname);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const queryClient = useQueryClient();

  const handleEditToggle = () => {
    setEdit((prev) => !prev);
    setNewNickname(nickname);
    setIsDuplicate(false);
  };

  const handleCancelEdit = () => {
    toast.info(TOAST_MESSAGE.MYPAGE.SAME_NICKNAME_ERROR);
    setEdit(false);
    setNewNickname(nickname);
    setIsDuplicate(false);
  };

  const handleNicknameChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const nicknameInput = e.target.value;
    setNewNickname(nicknameInput);

    if (!nicknameInput.trim()) {
      setIsDuplicate(false);
      return;
    }

    const duplicate = await checkNicknameDuplicate(nicknameInput);
    setIsDuplicate(duplicate);
  };

  const handleUpdateNickname = async () => {
    if (!newNickname.trim()) {
      toast.error(TOAST_MESSAGE.MYPAGE.SUBMIT_NICKNAME_INFO);
      return;
    }

    if (newNickname !== nickname && isDuplicate) {
      toast.warn(TOAST_MESSAGE.MYPAGE.EXIST_NICKNAME_ERROR);
      setEdit(true);
      return;
    }

    updateNickname(newNickname, {
      onSuccess: () => {
        if (newNickname === nickname) {
          toast.info(TOAST_MESSAGE.MYPAGE.SAME_NICKNAME_ERROR);
          setEdit(false);
        }
        if (newNickname !== nickname) {
          toast.success(TOAST_MESSAGE.MYPAGE.CHANGE_NICKNAME_SUCCESS);
          setEdit(false);
        }
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.NICKNAME],
        });
      },
    });
  };

  if (isPending) return <div>쿠키 주문하신 분?</div>;

  return (
    <div className="relative w-full rounded-2xl border border-primary-50 bg-white py-5 md:flex md:h-[330px] md:w-[600px] md:items-center md:justify-center">
      <div className="flex flex-col items-center gap-2">
        <EmotionImage src={EMOTION_COOKIE_IMAGE_URL.JOY} size="s" />
        <div className="flex h-10 items-center justify-center gap-2">
          {edit ? (
            <>
              <input
                className="flex h-9 w-20 rounded-xl bg-grey-0 text-center text-lg font-semibold outline-none focus:border-primary-300"
                value={newNickname}
                onChange={handleNicknameChange}
              />
              <button
                onClick={handleUpdateNickname}
                disabled={isPending}
                className="flex items-center justify-center"
              >
                <SquareCheckBig size={18} />
              </button>
              <button
                onClick={handleCancelEdit}
                disabled={isPending}
                className="absolute right-4 top-4 z-10"
              >
                <X size={20} />
              </button>
            </>
          ) : (
            <>
              <div className="h-[18px] w-[18px]"></div>
              <strong className="flex items-center justify-center text-xl text-grey-7">
                {nickname}
              </strong>
              <button
                onClick={handleEditToggle}
                disabled={isPending}
                className="flex items-center justify-center"
              >
                <SquarePen size={18} />
              </button>
            </>
          )}
        </div>

        {edit ? (
          <p
            className={`h-5 text-xs ${isDuplicate ? "text-secondary-300" : "text-primary-300"}`}
          >
            {isDuplicate ? "중복된 닉네임입니다" : "사용 가능한 닉네임입니다"}
          </p>
        ) : (
          <strong className="text-sm text-grey-3">나의 프로필</strong>
        )}
      </div>
    </div>
  );
};

export default MypageProfile;
