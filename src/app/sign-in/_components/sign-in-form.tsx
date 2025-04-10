"use client";

import { FormData } from "@/app/sign-up/type";
import EMOTION_COOKIE_IMAGE_URL from "@/constants/emotions-url.constant";
import { FORM_MESSAGE } from "@/constants/form-message.constant";
import {
  EMAIL_VALIDATION,
  PASSWORD_VALIDATION,
} from "@/constants/validations.constant";
import { useSignInMutation } from "@/hooks/mutations/auth-mutation";
import Button from "@/ui/common/button.common";
import EmotionImage from "@/ui/common/emotion-image.common";
import Input from "@/ui/common/input.common";
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
    <div className="border border-red-500 w-full h-screen flex flex-col justify-center items-center bg-primary-50">
      <div className="border border-red-500 w-96 min-h-screen flex flex-col justify-start items-center py-20">
        <EmotionImage src={EMOTION_COOKIE_IMAGE_URL.JOY} size="l" />

        <h1 className="text-2xl font-bold text-gray-6 mt-4 mb-2">Smookie</h1>
        <p className="text-sm text-gray-500 mb-8">
          하루의 끝, 마음을 조용히 들여다보고 싶을 때
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border border-red-500 w-full flex flex-col space-y-4"
        >
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

        <button
          onClick={() => router.push("/sign-up")}
          className="mt-4 text-sm text-gray-6"
        >
          회원가입
        </button>

        <div className="flex items-center justify-center w-full max-w-sm mt-10">
          <div className="flex-1 border-t border-gray-1" />
          <p className="mx-4 text-xs text-gray-3">간편 로그인</p>
          <div className="flex-1 border-t border-gray-1" />
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
