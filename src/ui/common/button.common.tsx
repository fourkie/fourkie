import { ButtonProps } from "@/types/components-props.type";

const Button = ({
  children,
  disabled,
  onClick,
  type,
  icon,
  iconPosition,
  backgroundColor,
  classname,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full cursor-pointer rounded-2xl py-[5px] text-lg md:py-2 bg-${backgroundColor === "sub" ? "primary-200" : "primary-500 text-white"} ${classname}`}
    >
      <strong className="mx-auto">
        {icon && iconPosition === "left" && <>{icon}</>}
        {children}
        {icon && iconPosition === "right" && <>{icon}</>}
      </strong>
    </button>
  );
};

export default Button;
