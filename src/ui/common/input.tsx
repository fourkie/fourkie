import { InputProps } from "@/types/common-components.types";
import { forwardRef } from "react";

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="flex flex-col items-center">
        {label && <label>{label}</label>}

        <input ref={ref} {...props} />

        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
