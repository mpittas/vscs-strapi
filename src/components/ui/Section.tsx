import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  paddingY?: "none" | "sm" | "md" | "lg" | "xl" | "blog";
  bgColor?: "white" | "light" | "dark" | "dark-green" | string;
  id?: string;
  reveal?: boolean;
}

const paddingClasses = {
  none: "",
  sm: "py-8 sm:py-12 lg:py-16",
  md: "py-10 sm:py-16 lg:py-20",
  lg: "py-20 lg:py-24",
  xl: "py-24 lg:py-32",
  blog: "py-10 pt-24 lg:py-32",
};

const bgColorClasses: Record<string, string> = {
  white: "bg-white",
  light: "bg-slate-50",
  dark: "bg-[#0a1628]",
  "dark-green": "bg-dark-green",
};

export default function Section({
  children,
  className,
  paddingY = "md",
  bgColor = "white",
  id,
  reveal = true,
}: SectionProps) {
  // Check if bgColor is a preset or custom color
  const bgClass = bgColorClasses[bgColor] || bgColor;

  // Check if className contains a bg- class to allow overriding
  const hasBgInClassName = className?.includes("bg-");

  return (
    <section
      id={id}
      data-reveal-section={reveal ? "" : undefined}
      className={cn(
        paddingClasses[paddingY],
        !hasBgInClassName && bgClass,
        className,
      )}
    >
      {children}
    </section>
  );
}
