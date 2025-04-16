import { TOAST_MESSAGE } from "@/constants/toast-message.constant";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import createClient from "./supabase-client-service";

export const signUp = async (data: FieldValues) => {
  const { email, password, nickname } = data;
  const supabaseClient = createClient();

  try {
    const { error } = await supabaseClient.auth.signUp({
      email,
      password,
      options: {
        data: {
          user_nickname: nickname,
        },
      },
    });

    if (error) throw error;

    return null;
  } catch (error) {
    throw error;
  }
};

export const signIn = async (data: FieldValues) => {
  const { email, password } = data;
  const supabaseClient = createClient();

  try {
    const { error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
  } catch (error) {
    throw error;
  }
};

export const signOut = async () => {
  const supabaseClient = createClient();

  try {
    await supabaseClient.auth.signOut();
  } catch (error) {
    console.log(error);
  }
};

export const handleLogout = async (callback: () => void) => {
  try {
    await signOut();
    toast.success(TOAST_MESSAGE.ERROR.SIGNOUT_SUCCESS);
    callback();
  } catch {
    toast.error(TOAST_MESSAGE.ERROR.SIGNOUT_ERROR);
  }
};
