import { cn } from "@/lib/utils";
import React from "react";
import { Heading, Text } from "./Typography";

// Predefined style variants
const variants = {
  light: {
    borderColor: "border-slate-200",
    bgColor: "bg-white",
    hoverBgColor: "hover:bg-black/3",
    hoverBorderColor: "",
    titleColor: "text-slate-900",
    descriptionColor: "text-slate-900",
  },
  dark: {
    borderColor: "border-transparent",
    bgColor: "bg-white/4",
    hoverBgColor: "hover:bg-white/9",
    hoverBorderColor: "",
    titleColor: "text-white",
    descriptionColor: "text-white/80",
  },
};

interface IconTextBoxProps {
  icon: string | React.ReactNode;
  iconAlt?: string;
  title: string;
  description: string;
  className?: string;
  variant?: "light" | "dark";
  // Custom style overrides (optional)
  borderColor?: string;
  bgColor?: string;
  hoverBgColor?: string;
  hoverBorderColor?: string;
  titleColor?: string;
  descriptionColor?: string;
}

export default function IconTextBox({
  icon,
  iconAlt = "",
  title,
  description,
  className = "",
  variant = "light",
  borderColor,
  bgColor,
  hoverBgColor,
  hoverBorderColor,
  titleColor,
  descriptionColor,
}: IconTextBoxProps) {
  // Use variant styles as base, allow custom overrides
  const styles = {
    borderColor: borderColor || variants[variant].borderColor,
    bgColor: bgColor || variants[variant].bgColor,
    hoverBgColor: hoverBgColor || variants[variant].hoverBgColor,
    hoverBorderColor: hoverBorderColor || variants[variant].hoverBorderColor,
    titleColor: titleColor || variants[variant].titleColor,
    descriptionColor: descriptionColor || variants[variant].descriptionColor,
  };

  const isStringIcon = typeof icon === "string";

  return (
    <div
      className={cn(
        "group flex flex-col p-6 rounded-2xl border transition-all duration-300",
        styles.borderColor,
        styles.bgColor,
        styles.hoverBgColor || "hover:bg-brand-green",
        styles.hoverBorderColor || "hover:border-transparent",
        className,
      )}
    >
      {/* Icon */}
      <div className="mb-5">
        {isStringIcon ? (
          <img
            src={icon}
            alt={iconAlt || title}
            className="w-11 h-11 object-contain group-hover:brightness-0 group-hover:invert transition-all"
          />
        ) : (
          <div className="w-11 h-11 flex items-center justify-start text-brand-green text-4xl group-hover:text-slate-900 transition-colors">
            {icon}
          </div>
        )}
      </div>

      {/* Title */}
      <Heading
        as="h4"
        className={cn("mb-3 transition-colors", styles.titleColor)}
      >
        {title}
      </Heading>

      {/* Description */}
      <Text
        variant="body-16"
        className={cn("transition-colors", styles.descriptionColor)}
      >
        {description}
      </Text>
    </div>
  );
}
