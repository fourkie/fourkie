"use client";

import { useSignupMutation } from "@/hooks/mutations/auth-mutations";
import { FieldValues, useForm } from "react-hook-form";
import { FormData } from "../type";
import { FORM_MESSAGE } from "@/constants/form-message";

const SignUpForm = () => {
  const { register, handleSubmit, formState } = useForm<FormData>({
    mode: "onBlur",
  });

  const { mutate: signUp } = useSignupMutation();

  const onSubmit = (value: FieldValues) => {
    signUp(value);
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

      <input
        {...register("nickname", {
          required: { value: true, message: FORM_MESSAGE.NICKNAME },
        })} // pattern: {value: ..., message: ...}로 정규식 추가하여 유효성 검사
        type="text"
        placeholder={FORM_MESSAGE.NICKNAME}
      />
      <button disabled={!formState.isValid}>회원가입</button>
    </form>
  );
};

export default SignUpForm;
