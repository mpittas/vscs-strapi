import Image from "next/image";
import { cn } from "@/lib/utils";

// Predefined style variants
const variants = {
  light: {
    borderColor: "border-slate-200",
    bgColor: "bg-white",
    hoverBgColor: "hover:bg-black/3",
    hoverBorderColor: "",
    titleColor: "text-slate-900",
    descriptionColor: "text-slate-600",
  },
  dark: {
    borderColor: "border-transparent",
    bgColor: "bg-white/4",
    hoverBgColor: "hover:bg-white/9",
    hoverBorderColor: "",
    titleColor: "text-white",
    descriptionColor: "text-white/70",
  },
};

interface IconTextBoxProps {
  icon: string;
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

  return (
    <div
      className={cn(
        "flex flex-col p-6 rounded-2xl border transition-colors duration-300",
        styles.borderColor,
        styles.bgColor,
        styles.hoverBgColor,
        styles.hoverBorderColor,
        className
      )}
    >
      {/* Icon */}
      <div className="mb-4">
        <Image
          src={icon}
          alt={iconAlt || title}
          width={48}
          height={48}
          className="w-12 h-12"
        />
      </div>

      {/* Title */}
      <h3 className={cn("text-lg font-normal mb-2", styles.titleColor)}>
        {title}
      </h3>

      {/* Description */}
      <p className={cn("text-sm leading-relaxed", styles.descriptionColor)}>
        {description}
      </p>
    </div>
  );
}
