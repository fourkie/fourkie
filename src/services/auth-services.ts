import { FieldValues } from "react-hook-form";
import supabase from "./supabase";

export const signUp = async (data: FieldValues) => {
  const { email, password } = data;

  try {
    const { data: signUpData } = await supabase.auth.signUp({
      email,
      password,
      // options: {
      //   data: {
      //     user_nickname:{닉네임}
      //   }
      // }
    });

    return signUpData;
  } catch (error) {
    console.log(error);
  }
};

export const signIn = async (data: FieldValues) => {
  const { email, password } = data;

  try {
    const { data: signInData } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log(signInData);
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
