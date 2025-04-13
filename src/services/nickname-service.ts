import createClient from "./supabase-client-service";

export const getUserNickname = async () => {
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user?.id) {
    throw new Error("로그인이 필요한 서비스입니다.");
  }

  const { data } = await supabase
    .from("users")
    .select("user_nickname")
    .eq("user_uid", user.id)
    .single();

  return data?.user_nickname;
};

// 닉네임 수정하기
export const upDateMyNickname = async (newNickname: string) => {
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user?.id) {
    throw new Error("로그인이 필요한 서비스입니다.");
  }

  const { error: updateNicknameError } = await supabase
    .from("users")
    .update({ user_nickname: newNickname })
    .eq("user_uid", user.id);

  if (updateNicknameError) {
    throw new Error("닉네임 변경에 실패했습니다.");
  }
};
