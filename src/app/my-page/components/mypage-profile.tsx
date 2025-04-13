"use client";

import { useUpdateNicknameMutation } from "@/hooks/mutations/use-update-nickname-mutation";
import { useGetUserNicknameQuery } from "@/hooks/queries/use-get-user-nickname-query";
import Input from "@/ui/common/input.common";
import { SquareCheckBig, SquarePen } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

const MypageProfile = () => {
  const { data: nickname, isPending } = useGetUserNicknameQuery();
  const { mutate: updateNickname } = useUpdateNicknameMutation();
  const [edit, setEdit] = useState(false);
  const [newNickname, setNewNickname] = useState(nickname);

  const handleEditToggle = () => {
    setEdit((prev) => !prev);
    setNewNickname(nickname);
  };

  const handleUpdateNickname = () => {
    if (!newNickname.trim()) {
      toast.error("닉네임을 입력해주세요.");
      return;
    }
    updateNickname(newNickname, {
      onSuccess: () => {
        toast.success("닉네임이 수정되었습니다.");
        setEdit(false);
      },
    });
  };

  if (isPending) return <div>쿠키 주문하신 분?</div>;

  return (
    <div className="w-full bg-white rounded-xl border border-primary-100 p-6 mb-6">
      <div className="flex flex-col items-center gap-2">
        <div>
          {edit ? (
            <Input
              className="border"
              value={newNickname}
              onChange={(e) => setNewNickname(e.target.value)}
            />
          ) : (
            <h2>{nickname}</h2>
          )}
          <button
            onClick={edit ? handleUpdateNickname : handleEditToggle}
            disabled={isPending}
          >
            {edit ? <SquareCheckBig size={20} /> : <SquarePen size={20} />}
          </button>
        </div>
        {!edit && <p>나의 프로필</p>}
      </div>
    </div>
  );
};

export default MypageProfile;
