import supabase from "./supabase";

export const getAllPosts = async () => {
  try {
    const { data } = await supabase.from("posts").select("*");
    return data;
  } catch (error) {
    console.log(error);
  }
};
