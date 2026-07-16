import {
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "@/lib/utils";

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  icon?: ReactNode;
  required?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      icon,
      required,
      className,
      id,
      ...props
    },
    ref
  ) => {
    return (
      <div className="space-y-2">

        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-semibold text-[#222931]"
          >
            {label}

            {required && (
              <span className="ml-1 text-[#AF8428]">*</span>
            )}
          </label>
        )}

        <div
          className={cn(
            `
            flex
            items-center
            gap-3

            rounded-2xl

            border

            bg-white

            px-4

            py-3.5

            transition-all

            duration-300

            shadow-sm

            `,
            error
              ? "border-red-300 focus-within:border-red-400"
              : `
                border-gray-200

                hover:border-[#D9B471]/50

                focus-within:border-[#AF8428]

                focus-within:ring-4

                focus-within:ring-[#D9B471]/20
              `
          )}
        >
          {icon && (
            <div className="text-[#AF8428]">
              {icon}
            </div>
          )}

          <input
            ref={ref}
            id={id}
            className={cn(
              `
              w-full

              bg-transparent

              text-[#1B2126]

              placeholder:text-gray-400

              outline-none
              `,
              className
            )}
            {...props}
          />
        </div>

        {error ? (
          <p className="text-sm text-red-500">
            {error}
          </p>
        ) : helperText ? (
          <p className="text-sm text-[#222931]/60">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;