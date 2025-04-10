import createClient from "./supabase-server-service";

export const getUserId = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user?.id;
};

export const getUserNickname = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user?.user_metadata.user_nickname;
};
