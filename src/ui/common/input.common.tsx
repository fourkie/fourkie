import { InputProps } from "@/types/components-props.type";
import { forwardRef } from "react";

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col items-center">
        {label && <label>{label}</label>}

        <input ref={ref} {...props} />

        {error && (
          <p className="flex justify-center text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
