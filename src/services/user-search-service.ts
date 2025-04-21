import createClient from "./supabase-client-service";

export const searchUserByNicknameOrEmail = async (searchKeyword: string) => {
  const supabaseClient = createClient();

  try {
    const { data, error } = await supabaseClient
      .from("users")
      .select("user_uid, user_nickname, user_email")
      .or(`user_nickname.eq.${searchKeyword},user_email.eq.${searchKeyword}`)
      .maybeSingle();

    if (error) return null;
    return data;
  } catch {
    return null;
  }
};
