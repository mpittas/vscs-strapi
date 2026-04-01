import React, { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, id, rows = 6, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-y-2">
        <label htmlFor={id} className="text-sm font-medium text-slate-900">
          {label}
        </label>
        <textarea
          id={id}
          rows={rows}
          className={cn(
            "w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-100 focus:ring-2 focus:ring-[#b4d429] focus:outline-none transition-all resize-none",
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
Textarea.displayName = "Textarea";

export default Textarea;
