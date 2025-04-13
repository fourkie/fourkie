import createClient from "./supabase-server-service";

export const getUserId = async () => {
  const supabaseServer = createClient();
  const {
    data: { user },
  } = await supabaseServer.auth.getUser();

  if (!user) {
    return undefined;
  }
  return user?.id;
};

export const getUserNickname = async () => {
  const supabaseServer = createClient();
  const {
    data: { user },
  } = await supabaseServer.auth.getUser();

  if (!user) {
    return undefined;
  }

  return user?.user_metadata.user_nickname;
};
