import supabaseClient from "./supabase-client";

export const getFriendsPosts = async ({ userId }: { userId: string }) => {
  try {
    // 친구 목록 가져오기 (sender_uid / receiver_uid가 userId와 일치하고, accepted가 true)
    const { data: friends, error: friendsError } = await supabaseClient
      .from("friends")
      .select("*")
      .or(`sender_uid.eq.${userId},receiver_uid.eq.${userId}`) // 여기 수정됨
      .eq("accepted", true);

    if (friendsError) throw friendsError;

    if (!friends || friends.length === 0) return []; // 친구가 없으면 빈 배열 반환

    // 친구들의 userId
    const friendIds = friends.map((friend) =>
      friend.sender_uid === userId ? friend.receiver_uid : friend.sender_uid,
    );

    // 게시물 가져오기
    const { data: posts, error: postsError } = await supabaseClient
      .from("posts")
      .select("*")
      .in("user_id", friendIds); // user_id가 friendIds 배열에 포함된 게시물만 가져옴

    if (postsError) throw postsError;

    return posts;
  } catch (error) {
    console.error(error);
  }
};
