import { ReactNode } from "react";

export interface ButtonProps {
  children: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  icon?: ReactNode; // 아이콘
  iconPosition?: "left" | "right"; // 아이콘 위치
  classname?: string;
}

export interface InputProps {
  label?: string;
  name?: string;
  type?: "text" | "email" | "password";
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
}
