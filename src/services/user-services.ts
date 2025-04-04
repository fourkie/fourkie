import supabase from "./supabase-client";

export const getUserById = async ({ userId }: { userId: string }) => {
  try {
    const { data } = await supabase
      .from("users")
      .select("*")
      .eq("user_uid", userId)
      .single();
    return data;
  } catch (error) {
    console.log(error);   
  }
};
