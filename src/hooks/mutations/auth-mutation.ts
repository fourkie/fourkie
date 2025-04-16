import { QUERY_KEY } from "@/constants/query-keys.constant";
import { TOAST_MESSAGE } from "@/constants/toast-message.constant";
import { signIn, signUp } from "@/services/auth-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";

export const useSignupMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: FieldValues) => signUp(data), // 명확한 타입 지정
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.USER] });
      toast.success(TOAST_MESSAGE.SIGNUP.SUCCESS);
      router.push("/");
    },
    onError: (error: any) => {
      if (error?.message === "User already registered") {
        toast.error(TOAST_MESSAGE.SIGNUP.DUPLICATE_EMAIL);
      } else if (error?.message === "Database error saving new user") {
        toast.error(TOAST_MESSAGE.SIGNUP.DUPLICATE_NICKNAME);
      } else {
        toast.error(TOAST_MESSAGE.SIGNUP.SIGNUP_ERROR);
      }
    },
  });
};

export const useSignInMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: FieldValues) => signIn(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.USER] });
      router.push("/");
    },
    onError: (error) => {
      if (error?.message === "Invalid login credentials") {
        toast.error(TOAST_MESSAGE.SIGNIN.ERROR);
      } else {
        toast.error(TOAST_MESSAGE.SIGNIN.SIGNIN_ERROR);
      }
    },
  });
};
