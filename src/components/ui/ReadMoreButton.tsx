"use client";

import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface ReadMoreButtonProps {
  children?: React.ReactNode;
  text?: string;
  onClick?: () => void;
  isExpanded?: boolean;
  className?: string;

  // Customization props
  circleColor?: string;
  circleHoverColor?: string;
  textColor?: string;
  textHoverColor?: string;
  iconColor?: string;

  // Or maybe a simpler approach with specific use-case variants if desired,
  // but full customization is more flexible
}

export default function ReadMoreButton({
  children,
  text, // Alternative to children
  onClick,
  isExpanded = false,
  className,
  circleColor = "bg-neutral-200",
  circleHoverColor, // Defaults to brand-green usually, but let's handle logic inside
  textColor = "text-neutral-600",
  textHoverColor = "group-hover:text-brand-green",
  iconColor = "text-neutral-600",
}: ReadMoreButtonProps) {
  return (
    <div
      onClick={(e) => {
        if (onClick) {
          e.stopPropagation(); // If inside a clickable card, decide if we want propagation
          onClick();
        }
      }}
      className={cn(
        "inline-flex items-center gap-2 font-medium text-sm cursor-pointer select-none group transition-colors",
        textColor,
        textHoverColor && textHoverColor,
        className,
      )}
    >
      <span
        className={cn(
          "w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300",
          circleColor,
          circleHoverColor && `group-hover:${circleHoverColor}`,
          isExpanded ? "rotate-90" : "",
        )}
      >
        <ChevronRight className={cn("w-3 h-3 stroke-[3px]", iconColor)} />
      </span>
      <span className="relative top-[1px]">{text || children}</span>
    </div>
  );
}
