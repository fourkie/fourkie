"use client";

import EMOTION_COOKIE_IMAGE_URL from "@/constants/emotions-url.constant";
import { FORM_MESSAGE } from "@/constants/form-message.constant";
import {
  EMAIL_VALIDATION,
  NICKNAME_VALIDATION,
  PASSWORD_CONFIRM_VALIDATION,
  PASSWORD_VALIDATION,
} from "@/constants/validations.constant";
import { useSignupMutation } from "@/hooks/mutations/auth-mutation";
import Button from "@/ui/common/button.common";
import EmotionImage from "@/ui/common/emotion-image.common";
import Input from "@/ui/common/input.common";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { FormData } from "../type";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<FormData>({
    mode: "onBlur",
  });

  const { mutate: signUp } = useSignupMutation();

  const onSubmit = (value: FormData) => {
    signUp(value);
  };

  return (
    <div className="mx-auto flex max-w-[360px] flex-col items-center justify-center gap-10 px-5">
      <div className="flex flex-col items-center">
        <div className="mb-4 flex items-center justify-center rounded-full">
          <EmotionImage src={EMOTION_COOKIE_IMAGE_URL.EXCITED} size="l" />
        </div>
        <strong className="mb-1 text-xl text-grey-8">Smookie</strong>
        <p className="text-center text-sm text-grey-5">
          하루의 끝, 마음을 조용히 들여다보고 싶을 때
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <Input
          {...register("email", EMAIL_VALIDATION)}
          type="email"
          placeholder={FORM_MESSAGE.EMAIL}
          error={errors.email?.message}
        />

        <Input
          {...register("nickname", NICKNAME_VALIDATION)}
          type="text"
          placeholder={FORM_MESSAGE.NICKNAME}
          error={errors.nickname?.message}
        />

        <Input
          {...register("password", PASSWORD_VALIDATION)}
          type="password"
          placeholder={FORM_MESSAGE.PASSWORD}
          error={errors.password?.message}
        />

        <Input
          {...register(
            "passwordConfirm",
            PASSWORD_CONFIRM_VALIDATION(watch("password")),
          )}
          type="password"
          placeholder={FORM_MESSAGE.PASSWORD_CONFIRM}
          error={errors.passwordConfirm?.message}
        />

        <Button type="submit" disabled={!isValid}>
          회원가입
        </Button>
      </form>

      <div className="flex w-full items-center gap-3 text-grey-3">
        <div className="flex-grow border-b border-grey-3" />
        <Link href="/sign-in" className="whitespace-nowrap text-sm">
          이미 계정이 있으신가요?
        </Link>
        <div className="flex-grow border-b border-grey-3" />
      </div>
    </div>
  );
};
export default SignUpForm;
