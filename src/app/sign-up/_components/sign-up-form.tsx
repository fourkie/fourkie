"use client";

import { useSignupMutation } from "@/hooks/mutations/auth-mutations";
import { FieldValues, useForm } from "react-hook-form";

const SignUpForm = () => {
  const { register, handleSubmit, formState } = useForm<FormData>({
    mode: "onBlur",
  });
  const { mutate: signUp } = useSignupMutation();

  const onSubmit = (value: FieldValues) => {
    signUp(value);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("email", {
          required: { value: true, message: "이메일을 작성해주세요" },
        })} // pattern: {value: ..., message: ...}로 정규식 추가하여 유효성 검사
        type="email"
        placeholder="이메일을 입력하세요"
      />
      {formState.errors.email && <span>{formState.errors.email.message}</span>}
      <input
        {...register("password", {
          required: { value: true, message: "비밀번호를 작성해주세요" },
        })}
        type="password"
        placeholder="비밀번호를 입력하세요F"
      />
      <button disabled={!formState.isValid}>회원가입</button>
    </form>
  );
};

export default SignUpForm;

interface FormData {
  username: string;
  email: string;
  password: string;
}
