"use client";

import EMOTION_COOKIE_IMAGE_URL from "@/constants/emotions-url.constant";
import { FORM_MESSAGE } from "@/constants/form-message.constant";
import {
  EMAIL_VALIDATION,
  NICKNAME_VALIDATION,
  PASSWORD_VALIDATION,
} from "@/constants/validations.constant";
import { useSignupMutation } from "@/hooks/mutations/auth-mutation";
import { useLoginStore } from "@/hooks/zustand/store";
import Button from "@/ui/common/button.common";
import EmotionImage from "@/ui/common/emotion-image.common";
import Input from "@/ui/common/input.common";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { FormData } from "../type";

const SignUpForm = () => {
  const router = useRouter();
  const updateLoginStateKey = useLoginStore(
    (state) => state.updateLoginStateKey,
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: "onBlur",
  });

  const { mutate: signUp, isSuccess } = useSignupMutation();

  useEffect(() => {
    if (isSuccess) {
      router.push("/");
      updateLoginStateKey();
    }
  }, [isSuccess, router]);

  const onSubmit = (value: FieldValues) => {
    signUp(value);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary-50 px-6">
      <div className="flex flex-col items-center mb-10">
        <div className=" rounded-full flex items-center justify-center mb-4">
          <EmotionImage src={EMOTION_COOKIE_IMAGE_URL.JOY} size="l" />
        </div>
        <h1 className="text-xl font-bold text-grey-6 mb-1">Smookie</h1>
        <p className="text-grey-6 text-center">
          하루의 끝, 마음을 조용히 들여다보고 싶을 때
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-xs"
      >
        <Input
          {...register("email", EMAIL_VALIDATION)}
          type="email"
          placeholder={FORM_MESSAGE.EMAIL}
          error={errors.email?.message}
          className="bg-white px-4 py-3 rounded-xl border-none shadow-sm focus:outline-none w-full"
        />

        <Input
          {...register("password", PASSWORD_VALIDATION)}
          type="password"
          placeholder={FORM_MESSAGE.PASSWORD}
          error={errors.password?.message}
          className="bg-white px-4 py-3 rounded-xl border-none shadow-sm focus:outline-none w-full"
        />

        <Input
          {...register("nickname", NICKNAME_VALIDATION)}
          type="text"
          placeholder={FORM_MESSAGE.NICKNAME}
          error={errors.nickname?.message}
          className="bg-white px-4 py-3 rounded-xl border-none shadow-sm focus:outline-none w-full"
        />

        <Button
          type="submit"
          disabled={!isValid}
          classname="w-full bg-primary-300 text-primary-800 font-semibold py-3 rounded-xl mt-6"
        >
          회원가입
        </Button>
      </form>

      <div className="border border-grey-3 w-full mt-10" />
      <div className="text-grey-3 m-4">
        <Link href="/sign-in">이미 계정이 있으신가요?</Link>
      </div>
    </div>
  );
};

export default SignUpForm;
