import { FieldValues } from "react-hook-form";
import createClient from "./supabase-client-service";
import { toast } from "react-toastify";
import { TOAST_MESSAGE } from "@/constants/toast-message.constant";

export const signUp = async (data: FieldValues) => {
  const { email, password, nickname } = data;
  const supabaseClient = createClient();

  try {
    const { data: signUpData } = await supabaseClient.auth.signUp({
      email,
      password,
      options: {
        data: {
          user_nickname: nickname,
        },
      },
    });

    return signUpData;
  } catch (error) {
    console.log(error);
  }
};

export const signIn = async (data: FieldValues) => {
  const { email, password } = data;
  const supabaseClient = createClient();

  try {
    await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });
  } catch (error) {
    console.log(error);
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

export const handleLogout = async (router: any) => {
  try {
    await signOut();
    toast.success(TOAST_MESSAGE.ERROR.SIGNOUT_SUCCESS);
    router.push("/sign-in");
  } catch (error) {
    toast.error(TOAST_MESSAGE.ERROR.SIGNOUT_ERROR);
  }
};
