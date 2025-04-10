import createClient from "./supabase-client-service";

export const getAllPosts = async () => {
  const supabaseClient = createClient();
  try {
    const { data } = await supabaseClient.from("posts").select("*");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getMyPosts = async ({ userId }: { userId: string }) => {
  const supabaseClient = createClient();
  try {
    const { data } = await supabaseClient
      .from("posts")
      .select("*")
      .eq("user_id", userId);
    return data;
  } catch (error) {
    console.log(error);
  }
};
