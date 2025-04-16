import { CommonTextProps } from "@/types/text-component.type";

const CommonText = ({
  children,
  size,
  type,
  color = "black",
  className = "",
}: CommonTextProps) => {
  const textSize = {
    xs: "text-xs",
    sm: "text-sm",
    bs: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };

  //폰트 추가 예정정
  const textType = {
    h: "font-bold",
    title: "font-bold ",
    body: "font-bold",
  };

  const textColor = {
    black: "text-black",
    grey: "text-grey-6",
    white: "text-white",
  };

  return (
    <div
      className={`${textSize[size]}+ ${textType[type]}+${textColor[color]}+ ${className}`}
    >
      {children}
    </div>
  );
};

export default CommonText;
