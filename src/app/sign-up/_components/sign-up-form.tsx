"use client";

import { useSignupMutation } from "@/hooks/mutations/auth-mutations";
import { FieldValues, useForm } from "react-hook-form";
import { FormData } from "../type";
import {
  EMAIL_VALIDATION,
  NICKNAME_VALIDATION,
  PASSWORD_VALIDATION,
} from "@/constants/validations.constant";
import { FORM_MESSAGE } from "@/constants/form-message";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: "onBlur",
  });

  const { mutate: signUp } = useSignupMutation();

  const onSubmit = (value: FieldValues) => {
    signUp(value);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("email", EMAIL_VALIDATION)}
        type="email"
        placeholder={FORM_MESSAGE.EMAIL}
      />
      {errors.email && <span>{errors.email.message}</span>}
      <input
        {...register("password", PASSWORD_VALIDATION)}
        type="password"
        placeholder={FORM_MESSAGE.PASSWORD}
      />
      {errors.password && <span>{errors.password.message}</span>}

      <input
        {...register("nickname", NICKNAME_VALIDATION)}
        type="text"
        placeholder={FORM_MESSAGE.NICKNAME}
      />
      {errors.nickname && <span>{errors.nickname.message}</span>}

      <button disabled={!isValid}>회원가입</button>
    </form>
  );
};

export default SignUpForm;
