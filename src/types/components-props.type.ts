import { ReactNode } from "react";

export interface ButtonProps {
  children: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  classname?: string;
  backgroundColor?: string;
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
