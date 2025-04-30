import { ButtonProps } from "@/types/components-props.type";

const SignButton = ({ children, disabled, type }: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      aria-disabled={disabled}
      className="h-14 w-full cursor-pointer rounded-2xl bg-primary-300 text-lg text-primary-800 md:py-2"
    >
      <strong className="mx-auto">{children}</strong>
    </button>
  );
};

export default SignButton;
