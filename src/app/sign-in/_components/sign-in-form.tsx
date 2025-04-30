"use client";

import { FormData } from "@/app/sign-up/type";
import EMOTION_COOKIE_IMAGE_URL from "@/constants/emotions-url.constant";
import { FORM_MESSAGE } from "@/constants/form-message.constant";
import {
  EMAIL_VALIDATION,
  PASSWORD_VALIDATION,
} from "@/constants/validations.constant";
import { useSignInMutation } from "@/hooks/mutations/auth-mutation";
import EmotionImage from "@/ui/common/emotion-image.common";
import Input from "@/ui/common/input.common";
import SignButton from "@/ui/common/sign-button.common";
import { motion } from "framer-motion";
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
    <div className="mx-auto flex h-full max-w-[360px] flex-col items-center justify-center gap-7 px-5">
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { delay: 0 },
          }}
          viewport={{ once: true }}
          className="mb-5 flex items-center justify-center rounded-full"
        >
          <EmotionImage src={EMOTION_COOKIE_IMAGE_URL.EXCITED} size="l" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { delay: 0.06 },
          }}
          viewport={{ once: true }}
          className="mb-3 text-xl text-grey-6"
        >
          <strong>Smookie</strong>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { delay: 0.12 },
          }}
          viewport={{ once: true }}
          className="text-center text-xs text-grey-6"
        >
          하루의 끝, 마음을 조용히 들여다보고 싶을 때
        </motion.div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { delay: 0.2 },
          }}
          viewport={{ once: true }}
          aria-label="이메일 입력"
        >
          <Input
            {...register("email", EMAIL_VALIDATION)}
            type="email"
            placeholder={FORM_MESSAGE.EMAIL}
            error={errors.email?.message}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { delay: 0.3 },
          }}
          viewport={{ once: true }}
          aria-label="비밀번호 입력"
        >
          <Input
            {...register("password", PASSWORD_VALIDATION)}
            type="password"
            placeholder={FORM_MESSAGE.PASSWORD}
            error={errors.password?.message}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { delay: 0.42 },
          }}
          viewport={{ once: true }}
          aria-label="로그인 버튼"
        >
          <SignButton type="submit" disabled={!isValid}>
            로그인
          </SignButton>
        </motion.div>
      </form>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: { delay: 0.56 },
        }}
        viewport={{ once: true }}
        className="flex w-full items-center gap-3 text-grey-3"
      >
        <div className="flex-grow border-b border-grey-3" />
        <Link
          href="/sign-up"
          className="whitespace-nowrap text-sm"
          aria-label="회원가입 페이지로 이동"
        >
          회원가입하기
        </Link>
        <div className="flex-grow border-b border-grey-3" />
      </motion.div>
    </div>
  );
};
export default SignInForm;
