import {
  CreatePostsParams,
  updatePostsByPostIdParams,
} from "@/app/posting/type";
import { TOAST_MESSAGE } from "@/constants/toast-message.constant";
import dayjs from "dayjs";

import createClient from "./supabase-client-service";

export const getAllPosts = async () => {
  const supabaseClient = createClient();
  try {
    const { data } = await supabaseClient.from("posts").select("*");
    return data;
  } catch (error) {
    console.error(error);
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
    console.error(error);
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

export const getPostTodayEmotionById = async (userId: string) => {
  const supabaseClient = createClient();

  const startOfTodaySeoul = dayjs()
    .startOf("day")
    .format("YYYY-MM-DD HH:mm:ss");

  const endOfTodaySeoul = dayjs().endOf("day").format("YYYY-MM-DD HH:mm:ss");

  try {
    const { data, error } = await supabaseClient
      .from("posts")
      .select("post_emotion")
      .eq("user_id", userId)
      .gte("post_created_at", startOfTodaySeoul)
      .lte("post_created_at", endOfTodaySeoul);

    if (error) throw error;
    return data;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : TOAST_MESSAGE.POST.TODAY.EXISTS;
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

  const nowInKST = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Seoul",
  });

  try {
    const { data } = await supabaseClient.from("posts").insert([
      {
        user_id: userId,
        post_created_at: nowInKST,
        post_title: title,
        post_content: content,
        post_emotion: currentEmotion,
      },
    ]);

    return data;
  } catch (error) {
    console.error(error);
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
    console.error(error);
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
  } catch (err) {
    console.error("에러 발생:", err);
    throw err;
  }
};
