import { ButtonProps } from "@/types/components-props.type";

const Button = ({
  children,
  disabled,
  onClick,
  type,
  icon,
  iconPosition,
  classname,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`cursor-pointer ${classname}`}
    >
      <div className="mx-auto">
        {icon && iconPosition === "left" && <>{icon}</>}
        {children}
        {icon && iconPosition === "right" && <>{icon}</>}
      </div>
    </button>
  );
};

export default Button;
