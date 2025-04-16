import { FieldValues } from "react-hook-form";
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
