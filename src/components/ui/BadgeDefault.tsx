import { cn } from "@/lib/utils";

interface BadgeDefaultProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "primary" | "outline-white" | "white" | "glass";
  size?: "sm" | "md";
  uppercase?: boolean;
}

export default function BadgeDefault({
  children,
  className = "",
  variant = "default",
  size = "md",
  uppercase = false,
}: BadgeDefaultProps) {
  const variants = {
    default: "border border-slate-300 text-slate-700 bg-transparent",
    primary: "bg-[#009944] text-white border-none font-bold",
    "outline-white":
      "bg-transparent border border-white text-white hover:bg-white/10 transition-colors",
    white: "bg-white text-slate-900 border-none font-medium",
    glass: "bg-white/10 backdrop-blur-sm text-white border border-white/20",
  };

  const sizes = {
    sm: "px-2.5 py-2 m text-xs",
    md: "px-4 py-3 text-sm",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full leading-none",
        variants[variant],
        sizes[size],
        uppercase && "uppercase tracking-wider",
        className,
      )}
    >
      {children}
    </div>
  );
}
