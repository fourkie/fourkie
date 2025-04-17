import createClient from "./supabase-client-service";

export const getUserById = async ({ userId }: { userId: string }) => {
  const supabaseClient = createClient();
  try {
    const { data } = await supabaseClient
      .from("users")
      .select("*")
      .eq("user_uid", userId)
      .single();
    return data;
  } catch (error) {
    console.error(error);
  }
};
