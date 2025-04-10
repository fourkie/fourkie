import createClient from "./supabase-server";

export const getUserId = async () => {
  const supabaseServer = createClient();
  const {
    data: { user },
  } = await supabaseServer.auth.getUser();

  return user?.id;
};
