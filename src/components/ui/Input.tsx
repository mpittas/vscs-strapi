import React, { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, id, ...props }, ref) => {
    return (
      <div className="space-y-3">
        <label htmlFor={id} className="text-sm font-medium text-slate-900">
          {label}
        </label>
        <input
          id={id}
          className={cn(
            "w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-100 focus:ring-2 focus:ring-[#b4d429] focus:outline-none transition-all",
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
Input.displayName = "Input";

export default Input;
