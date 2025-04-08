import supabaseServer from "./supabase-server";

export const getUserId = async () => {
  const supabase2 = await supabaseServer();
  const {
    data: { user },
  } = await supabase2.auth.getUser();
  return user?.id;
};
