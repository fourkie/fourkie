import createClient from "./supabase-server-service";

export const getUserId = async () => {
  const supabaseServer = createClient();
  try {
    const {
      data: { user },
      error,
    } = await supabaseServer.auth.getUser();
    if (error) {
      throw error;
    }
    if (!user) {
      return undefined;
    }
    return user?.id;
  } catch (err) {
    console.error(err);
  }
};
