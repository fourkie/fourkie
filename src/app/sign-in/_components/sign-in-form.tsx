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
    <div className="flex flex-col items-center justify-center gap-10 bg-primary-50 px-10">
      <div className="flex flex-col items-center">
        <div className="mb-4 flex items-center justify-center rounded-full">
          <EmotionImage src={EMOTION_COOKIE_IMAGE_URL.EXCITED} size="l" />
        </div>
        <strong className="mb-1 text-xl text-grey-8">Smookie</strong>
        <p className="text-center text-grey-5">
          하루의 끝, 마음을 조용히 들여다보고 싶을 때
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
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
          classname="w-full bg-primary-300 text-primary-800 py-3 rounded-xl "
        >
          <strong>로그인</strong>
        </Button>
      </form>

      <div className="flex w-full items-center gap-3 text-grey-3">
        <div className="flex-grow border-b border-grey-3" />
        <Link href="/sign-up" className="whitespace-nowrap">
          회원가입하기
        </Link>
        <div className="flex-grow border-b border-grey-3" />
      </div>
    </div>
  );
};
export default SignInForm;
