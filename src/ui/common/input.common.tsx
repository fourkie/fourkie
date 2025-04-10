import { InputProps } from "@/types/components-props.type";
import { forwardRef } from "react";

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="flex flex-col items-center">
        {label && <label>{label}</label>}

        <input
          ref={ref}
          {...props}
          className="w-full h-16 px-4 py-3 rounded-2xl bg-white"
        />

        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
