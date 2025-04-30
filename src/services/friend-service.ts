import createClient from "./supabase-client-service";

export const getFriendIds = async ({ userId }: { userId: string }) => {
  const supabaseClient = createClient();
  try {
    const { data: friends, error: friendsError } = await supabaseClient
      .from("friends")
      .select("*")
      .or(`sender_uid.eq.${userId},receiver_uid.eq.${userId}`)
      .eq("accepted", true);

    if (friendsError) throw friendsError;

    if (!friends || friends.length === 0) return [];

    const friendIds = friends.map((friend) =>
      friend.sender_uid === userId ? friend.receiver_uid : friend.sender_uid,
    );

    return friendIds;
  } catch (error) {
    console.error(error);
  }
};

export const getFriendsPosts = async ({ userId }: { userId: string }) => {
  const supabaseClient = createClient();
  try {
    const friendIds = await getFriendIds({ userId });

    if (!friendIds || friendIds.length === 0) {
      return [];
    }

    const { data: posts, error: postsError } = await supabaseClient
      .from("posts")
      .select("*")
      .in("user_id", friendIds);

    if (postsError) throw postsError;

    return posts;
  } catch (error) {
    console.error(error);
  }
};
