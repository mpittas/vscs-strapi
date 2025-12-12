import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps {
  variant?: "primary" | "secondary" | "outline" | "white";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
}

export const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full border-1 font-normal transition-all duration-300 cursor-pointer no-underline";

export const sizeClasses = {
  sm: "py-2 px-4 text-sm",
  md: "py-3 px-6 text-base",
  lg: "py-4 px-8 text-lg",
};

export const variantClasses = {
  primary:
    "bg-green border-green text-white hover:bg-green/90 hover:border-green/90",
  secondary:
    "bg-white/10 text-white border-white/20 backdrop-blur-sm hover:bg-white/20",
  outline:
    "bg-transparent text-green border-green hover:bg-green hover:text-white",
  white:
    "bg-white text-slate-900 border-white hover:bg-slate-100 hover:border-slate-100",
};

export default function Button({
  variant = "primary",
  size = "md",
  children,
  href,
  onClick,
  className,
  type = "button",
  fullWidth = false,
}: ButtonProps) {
  const classes = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && "w-full",
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
