import { ReactNode } from "react";

export interface ButtonProps {
  children: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  icon?: ReactNode; // 아이콘
  iconPosition?: "left" | "right"; // 아이콘 위치
}
