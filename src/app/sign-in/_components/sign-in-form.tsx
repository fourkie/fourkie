"use client";

import { FormData } from "@/app/sign-up/type";
import { FORM_MESSAGE } from "@/constants/form-message";
import {
  EMAIL_VALIDATION,
  PASSWORD_VALIDATION,
} from "@/constants/validations.constant";
import { useSignInMutation } from "@/hooks/mutations/auth-mutations";
import Button from "@/ui/common/button";
import Input from "@/ui/common/input";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";

const SignInForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ mode: "onBlur" });

  const { mutate: signIn, isSuccess } = useSignInMutation();

  useEffect(() => {
    if (isSuccess) {
      router.push("/");
    }
  }, [isSuccess, router]);

  const onSubmit = (value: FieldValues) => {
    signIn(value);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("email", EMAIL_VALIDATION)}
        type="email"
        placeholder={FORM_MESSAGE.EMAIL}
        error={errors.email?.message}
      />
      <Input
        {...register("password", PASSWORD_VALIDATION)}
        type="password"
        placeholder={FORM_MESSAGE.PASSWORD}
        error={errors.password?.message}
      />
      <Button type="submit" disabled={!isValid}>
        로그인
      </Button>
    </form>
  );
};

export default SignInForm;
