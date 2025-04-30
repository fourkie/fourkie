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
import EmotionImage from "@/ui/common/emotion-image.common";
import Input from "@/ui/common/input.common";
import SignButton from "@/ui/common/sign-button.common";
import { motion } from "framer-motion";
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
    <div className="mx-auto flex h-full max-w-[360px] flex-col items-center justify-center gap-7 px-5 pt-10">
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { delay: 0 },
          }}
          viewport={{ once: true }}
          className="mb-3 flex w-16 items-center justify-center rounded-full"
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
        >
          <Input
            {...register("nickname", NICKNAME_VALIDATION)}
            type="text"
            placeholder={FORM_MESSAGE.NICKNAME}
            error={errors.nickname?.message}
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
        >
          <Input
            {...register("password", PASSWORD_VALIDATION)}
            type="password"
            placeholder={FORM_MESSAGE.PASSWORD}
            error={errors.password?.message}
          />{" "}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { delay: 0.56 },
          }}
          viewport={{ once: true }}
        >
          <Input
            {...register(
              "passwordConfirm",
              PASSWORD_CONFIRM_VALIDATION(watch("password")),
            )}
            type="password"
            placeholder={FORM_MESSAGE.PASSWORD_CONFIRM}
            error={errors.passwordConfirm?.message}
          />{" "}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { delay: 0.72 },
          }}
          viewport={{ once: true }}
        >
          <SignButton type="submit" disabled={!isValid}>
            회원가입
          </SignButton>
        </motion.div>
      </form>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: { delay: 0.9 },
        }}
        viewport={{ once: true }}
        className="flex w-full items-center gap-3 text-grey-3"
      >
        <div className="flex-grow border-b border-grey-3" />
        <Link href="/sign-in" className="whitespace-nowrap text-sm">
          이미 계정이 있으신가요?
        </Link>
        <div className="flex-grow border-b border-grey-3" />
      </motion.div>
    </div>
  );
};
export default SignUpForm;
