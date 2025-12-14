import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowUpRight, type LucideIcon } from "lucide-react";

interface ButtonProps {
  variant?: "primary" | "secondary" | "outline" | "white" | "black" | "white-solid";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  showIcon?: boolean;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
}

export const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full border-1 font-normal transition-all duration-300 cursor-pointer no-underline";

export const sizeClasses = {
  sm: "py-2 px-4 text-sm",
  md: "py-3 px-6 text-base",
  lg: "py-4 px-8 text-lg",
};

// Size classes when icon is shown on the right (reduced right padding)
export const sizeClassesWithIconRight = {
  sm: "py-1 pl-4 pr-1 text-sm",
  md: "py-1.5 pl-6 pr-1.5 text-base",
  lg: "py-2 pl-8 pr-2 text-lg",
};

// Size classes when icon is shown on the left (reduced left padding)
export const sizeClassesWithIconLeft = {
  sm: "py-1 pr-4 pl-1 text-sm",
  md: "py-1.5 pr-6 pl-1.5 text-base",
  lg: "py-2 pr-8 pl-2 text-lg",
};

// Icon margin classes matching button padding (sm=4, md=6, lg=8)
export const iconMarginClasses = {
  left: { sm: "mr-1", md: "mr-2", lg: "mr-3" },
  right: { sm: "ml-1", md: "ml-2", lg: "ml-3" },
};

export const variantClasses = {
  primary:
    "bg-brand-green border-brand-green text-dark hover:bg-brand-green/90 hover:border-brand-green/90",
  secondary:
    "bg-white/10 text-white border-white/20 backdrop-blur-sm hover:bg-white/20",
  outline:
    "bg-transparent text-green border-green hover:bg-green hover:text-white",
  white:
    "bg-white text-dark-green border-white hover:bg-slate-100 hover:border-slate-100",
  black:
    "bg-dark-green border-dark-green text-white hover:bg-dark-green/90 hover:border-dark-green/90",
  "white-solid":
    "bg-white border-white text-dark-green hover:bg-white/90 hover:border-white/90",
};

// Icon circle style variants
export const iconCircleStyles = {
  default: "bg-dark-green text-white",
  inverted: "bg-white text-dark-green",
};

// Icon circle component
function IconCircle({
  icon: Icon = ArrowUpRight,
  marginClass,
  inverted = false,
}: {
  icon?: LucideIcon;
  marginClass?: string;
  inverted?: boolean;
}) {
  return (
    <span
      className={cn(
        "flex items-center justify-center w-[38px] h-[38px] rounded-full",
        inverted ? iconCircleStyles.inverted : iconCircleStyles.default,
        marginClass
      )}
    >
      <Icon className="w-5 h-5" strokeWidth={2} />
    </span>
  );
}

export default function Button({
  variant = "primary",
  size = "md",
  children,
  href,
  onClick,
  className,
  type = "button",
  fullWidth = false,
  showIcon = false,
  icon,
  iconPosition = "right",
}: ButtonProps) {
  const getSizeClasses = () => {
    if (!showIcon) return sizeClasses[size];
    return iconPosition === "left"
      ? sizeClassesWithIconLeft[size]
      : sizeClassesWithIconRight[size];
  };

  const classes = cn(
    baseClasses,
    variantClasses[variant],
    getSizeClasses(),
    fullWidth && "w-full",
    className
  );

  const iconMargin = showIcon ? iconMarginClasses[iconPosition][size] : undefined;
  const isInvertedIcon = variant === "black";

  const content = (
    <>
      {showIcon && iconPosition === "left" && (
        <IconCircle icon={icon} marginClass={iconMargin} inverted={isInvertedIcon} />
      )}
      {children}
      {showIcon && iconPosition === "right" && (
        <IconCircle icon={icon} marginClass={iconMargin} inverted={isInvertedIcon} />
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {content}
    </button>
  );
}

