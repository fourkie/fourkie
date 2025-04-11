import { QUERY_KEY } from "@/constants/query-keys.constant";
import { signIn, signUp } from "@/services/auth-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";

export const useSignupMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FieldValues) => signUp(data), // 명확한 타입 지정
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.USER] }); // 배열로 감싸기 (React Query 권장 방식)
    },
    onError: (error) => {
      if (error instanceof Error) {
        console.error("Signup error:", error.message);
      } else {
        console.error("Unknown error during signup", error);
      }
    },
  });
};

export const useSignInMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FieldValues) => signIn(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.USER] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        console.error("Signup error:", error.message);
      } else {
        console.error("Unknown error during signup", error);
      }
    },
  });
};
