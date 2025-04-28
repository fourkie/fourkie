import createClient from "./supabase-client-service";

export const searchUserByNicknameOrEmail = async (searchKeyword: string) => {
  const supabaseClient = createClient();

  try {
    const { data, error } = await supabaseClient
      .from("users")
      .select("user_uid, user_nickname, user_email")
      .or(
        `user_nickname.ilike.%${searchKeyword}%,user_email.ilike.%${searchKeyword}%`,
      );

    if (error) return [];
    return data;
  } catch {
    return [];
  }
};
