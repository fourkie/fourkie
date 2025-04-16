"use client";

import { useSignupMutation } from "@/hooks/mutations/auth-mutation";
import { FieldValues, useForm } from "react-hook-form";
import { FormData } from "../type";
import {
  EMAIL_VALIDATION,
  NICKNAME_VALIDATION,
  PASSWORD_VALIDATION,
} from "@/constants/validations.constant";
import { FORM_MESSAGE } from "@/constants/form-message.constant";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useLoginStore } from "@/hooks/zustand/store";
import Input from "@/ui/common/input.common";
import Button from "@/ui/common/button.common";
import EMOTION_COOKIE_IMAGE_URL from "@/constants/emotions-url.constant";
import EmotionImage from "@/ui/common/emotion-image.common";
import Link from "next/link";

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
        className="w-full max-w-xs space-y-4"
      >
        <Input
          {...register("email", EMAIL_VALIDATION)}
          type="email"
          placeholder={FORM_MESSAGE.EMAIL}
          className="bg-white px-4 py-3 rounded-xl border-none shadow-sm focus:outline-none"
        />
        {errors.email && <span>{errors.email.message}</span>}

        <Input
          {...register("password", PASSWORD_VALIDATION)}
          type="password"
          placeholder={FORM_MESSAGE.PASSWORD}
          className="bg-white px-4 py-3 rounded-xl border-none shadow-sm focus:outline-none"
        />
        {errors.password && <span>{errors.password.message}</span>}

        <Input
          {...register("nickname", NICKNAME_VALIDATION)}
          type="text"
          placeholder={FORM_MESSAGE.NICKNAME}
          className="bg-white px-4 py-3 rounded-xl border-none shadow-sm focus:outline-none"
        />
        {errors.nickname && <span>{errors.nickname.message}</span>}

        <Button
          type="submit"
          disabled={!isValid}
          classname="w-full bg-primary-300 text-primary-800 font-semibold py-3 rounded-xl"
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
