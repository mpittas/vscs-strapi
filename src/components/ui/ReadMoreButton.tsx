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
  circleColor = "bg-black",
  circleHoverColor, // Defaults to brand-green usually, but let's handle logic inside
  textColor = "text-slate-900",
  textHoverColor = "group-hover:text-brand-green",
  iconColor = "text-white",
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
        "inline-flex items-center gap-2 font-bold text-sm cursor-pointer select-none group transition-colors",
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
          // Default hover behavior if not specified?
          // For ServiceSteps: group-hover:bg-brand-green
          // For WorkProcess: group-hover:bg-dark-green/70
          isExpanded ? "rotate-90" : "", // When expanded, usually highlights
        )}
      >
        <ChevronRight className={cn("w-3 h-3 stroke-[3px]", iconColor)} />
      </span>
      <span className="relative top-[1px]">{text || children}</span>
    </div>
  );
}
