import {
  CreatePostsParams,
  updatePostsByPostIdParams,
} from "@/app/posting/type";
import createClient from "./supabase-client-service";
import { TOAST_MESSAGE } from "@/constants/toast-message.constant";

export const getAllPosts = async () => {
  const supabaseClient = createClient();
  try {
    const { data } = await supabaseClient.from("posts").select("*");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllPostsById = async ({ userId }: { userId: string }) => {
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

export const getPostsByPostId = async ({ postId }: { postId?: string }) => {
  const supabaseClient = createClient();
  try {
    const { data } = await supabaseClient
      .from("posts")
      .select("*")
      .eq("post_id", postId);
    return data;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : TOAST_MESSAGE.POST.FETCH.ERROR;
    throw new Error(errorMessage);
  }
};

export const createPosts = async ({
  userId,
  title,
  content,
  currentEmotion,
}: CreatePostsParams) => {
  const supabaseClient = createClient();
  try {
    const { data } = await supabaseClient.from("posts").insert([
      {
        user_id: userId,
        post_title: title,
        post_content: content,
        post_emotion: currentEmotion,
      },
    ]);

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updatePostsByPostId = async ({
  postId,
  title,
  content,
  currentEmotion,
}: updatePostsByPostIdParams) => {
  const supabaseClient = createClient();
  try {
    const { data } = await supabaseClient
      .from("posts")
      .update({
        post_title: title,
        post_content: content,
        post_emotion: currentEmotion,
      })
      .eq("post_id", postId);

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const removePost = async (postId: number) => {
  const supabaseClient = createClient();
  try {
    const { error } = await supabaseClient
      .from("posts")
      .delete()
      .eq("post_id", postId);

    if (error) {
      console.error("게시글 삭제 실패:", error.message);
      throw new Error("게시글 삭제에 실패했어요.");
    }

    console.log("게시글 삭제 성공");
  } catch (err) {
    console.error("에러 발생:", err);
    throw err;
  }
};
