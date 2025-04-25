import { InputProps } from "@/types/components-props.type";
import { forwardRef } from "react";

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col items-center">
        {label && <label>{label}</label>}

        <input
          ref={ref}
          {...props}
          className="w-full rounded-xl border-none bg-white px-4 py-3 shadow-sm placeholder:text-sm focus:outline-none"
        />

        {error ? (
          <span className="flex h-6 w-full items-center justify-start pl-4 text-xs text-red-500">
            {error}
          </span>
        ) : (
          <div className="h-6"></div>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
