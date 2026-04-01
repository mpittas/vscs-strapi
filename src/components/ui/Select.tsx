import React, { SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, id, children, ...props }, ref) => {
    return (
      <div className="space-y-3">
        <label htmlFor={id} className="text-sm font-medium text-slate-900">
          {label}
        </label>
        <select
          id={id}
          className={cn(
            "w-full px-4 py-3.5 rounded-lg border border-gray-300 bg-gray-100 focus:ring-2 focus:ring-[#b4d429] focus:outline-none transition-all",
            className,
          )}
          ref={ref}
          {...props}
        >
          {children}
        </select>
      </div>
    );
  },
);
Select.displayName = "Select";

export default Select;
