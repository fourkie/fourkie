import { ButtonProps } from "@/types/components-props.type";

const Button = ({
  children,
  disabled,
  onClick,
  type,
  icon,
  iconPosition,
}: ButtonProps) => {
  return (
    <button type={type} onClick={onClick} disabled={disabled}>
      <div className="w-full h-16 px-4 py-3 rounded-2xl bg-primary-400 text-gray-0 font-bold flex justify-center items-center">
        {icon && iconPosition === "left" && <>{icon}</>}
        {children}
        {icon && iconPosition === "right" && <>{icon}</>}
      </div>
    </button>
  );
};

export default Button;
