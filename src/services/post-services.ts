import supabaseClient from "./supabase-client";

export const getAllPosts = async () => {
  try {
    const { data } = await supabaseClient.from("posts").select("*");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getMyPosts = async ({ userId }: { userId: string }) => {
  try {
    const { data } = await supabaseClient
      .from("posts")
      .select("*")
      .eq("user_id", userId);
    return data;
  } catch (error) {
    console.log(error);
  }
}