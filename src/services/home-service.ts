import supabaseServer from "./supabase-server-service";

export const getUserId = async () => {
  const supabase2 = await supabaseServer();
  const {
    data: { user },
  } = await supabase2.auth.getUser();
  return user?.id;
};

export const getUserNickname = async () => {
  const supabase2 = await supabaseServer();
  const {
    data: { user },
  } = await supabase2.auth.getUser();
  return user?.user_metadata.user_nickname;
};
