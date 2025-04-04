"use client";

import { FormData } from "@/app/sign-up/type";
import { FORM_MESSAGE } from "@/constants/form-message";
import { useSignInMutation } from "@/hooks/mutations/auth-mutations";
import { FieldValues, useForm } from "react-hook-form";

const SignInForm = () => {
  const { register, handleSubmit, formState } = useForm<FormData>();
  const { mutate: signIn } = useSignInMutation();

  const onSubmit = (value: FieldValues) => {
    signIn(value);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("email", {
          required: { value: true, message: FORM_MESSAGE.EMAIL },
        })} // pattern: {value: ..., message: ...}로 정규식 추가하여 유효성 검사
        type="email"
        placeholder={FORM_MESSAGE.EMAIL}
      />
      {formState.errors.email && <span>{formState.errors.email.message}</span>}
      <input
        {...register("password", {
          required: { value: true, message: FORM_MESSAGE.PASSWORD },
        })}
        type="password"
        placeholder={FORM_MESSAGE.PASSWORD}
      />
      <button disabled={!formState.isValid}>로그인</button>
    </form>
  );
};

export default SignInForm;
