import { FORM_MESSAGE } from "./form-message";

export const EMAIL_VALIDATION = {
  required: { value: true, message: FORM_MESSAGE.EMAIL },
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "올바른 이메일 형식이 아닙니다.",
  },
};

export const PASSWORD_VALIDATION = {
  required: { value: true, message: FORM_MESSAGE.PASSWORD },
  minLength: {
    value: 8,
    message: "비밀번호는 최소 8자 이상이어야 합니다.",
  },
};

export const NICKNAME_VALIDATION = {
  required: { value: true, message: FORM_MESSAGE.NICKNAME },
  maxLength: {
    value: 6,
    message: "닉네임은 최대 6자까지 입력 가능합니다.",
  },
};
