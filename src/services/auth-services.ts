import { FieldValues } from "react-hook-form";
import supabase from "./supabase-client";

export const signUp = async (data: FieldValues) => {
  const { email, password, nickname } = data;

  try {
    const { data: signUpData } = await supabase.auth.signUp({
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

  try {
    await supabase.auth.signInWithPassword({ email, password });
  } catch (error) {
    console.log(error);
  }
};

export const signOut = async () => {
  try {
    await supabase.auth.signOut();
  } catch (error) {
    console.log(error);
  }
};
