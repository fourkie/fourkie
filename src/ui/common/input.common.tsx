import { InputProps } from "@/types/components-props.type";
import { forwardRef, useId } from "react";

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...props }, ref) => {
    const inputId = useId();
    const errorId = `${inputId}-error`;

    return (
      <div className="flex flex-col items-center">
        {label && (
          <label htmlFor={inputId} className="mb-1 text-sm font-medium">
            {label}
          </label>
        )}

        <input
          id={inputId}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          {...props}
          className="w-full rounded-xl border-none bg-white px-4 py-4 shadow-sm placeholder:text-sm focus:outline-none"
        />

        {error ? (
          <span
            id={errorId}
            role="alert"
            className="flex h-6 w-full items-center justify-start pl-4 text-xs text-red-500"
          >
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
