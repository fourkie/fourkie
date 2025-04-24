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
import Link from "next/link";
import { useForm } from "react-hook-form";

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ mode: "onBlur" });

  const { mutate: signIn } = useSignInMutation();

  const onSubmit = (value: FormData) => {
    signIn(value);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-primary-50 px-6">
      <div className="mb-10 flex flex-col items-center">
        <div className="mb-4 flex items-center justify-center rounded-full">
          <EmotionImage src={EMOTION_COOKIE_IMAGE_URL.JOY} size="l" />
        </div>
        <h1 className="mb-1 text-xl font-bold text-grey-6">Smookie</h1>
        <p className="text-center text-grey-6">
          하루의 끝, 마음을 조용히 들여다보고 싶을 때
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-xs">
        <Input
          {...register("email", EMAIL_VALIDATION)}
          type="email"
          placeholder={FORM_MESSAGE.EMAIL}
          error={errors.email?.message}
          className="w-full rounded-xl border-none bg-white px-4 py-3 shadow-sm focus:outline-none"
        />
        <Input
          {...register("password", PASSWORD_VALIDATION)}
          type="password"
          placeholder={FORM_MESSAGE.PASSWORD}
          error={errors.password?.message}
          className="w-full rounded-xl border-none bg-white px-4 py-3 shadow-sm focus:outline-none"
        />
        <Button
          type="submit"
          disabled={!isValid}
          classname="w-full bg-primary-300 text-primary-800 font-semibold py-3 rounded-xl mt-6"
        >
          로그인
        </Button>
      </form>
      <div className="mt-10 w-full border border-grey-2" />
      <Link href="/sign-up" className="m-4 text-grey-3">
        회원가입하기
      </Link>
    </div>
  );
};
export default SignInForm;
