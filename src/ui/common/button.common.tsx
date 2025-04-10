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
      <div className="flex items-center">
        {icon && iconPosition === "left" && <>{icon}</>}
        {children}
        {icon && iconPosition === "right" && <>{icon}</>}
      </div>
    </button>
  );
};

export default Button;
