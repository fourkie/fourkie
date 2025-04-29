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
  const baseBg =
    backgroundColor === "sub"
      ? "primary-200 text-primary-700"
      : "primary-500 text-grey-0";
  const hoverBg =
    backgroundColor === "sub" ? "hover:bg-primary-300" : "hover:bg-primary-550";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full cursor-pointer rounded-2xl py-[5px] text-lg md:py-2 bg-${baseBg} ${hoverBg} ${classname}`}
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
