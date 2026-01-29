import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  /** Container size: "default" for full width, "sm" for 900px max-width */
  size?: "default" | "sm";
}

/**
 * Consistent container component with responsive padding.
 * Default: px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40
 * Size sm: max-width 900px
 */
export default function Container({
  children,
  className,
  size = "default",
}: ContainerProps) {
  return (
    <div
      className={cn(
        "w-full mx-auto px-6",
        size === "sm" ? "max-w-[900px]" : "max-w-[1200px]",
        className,
      )}
    >
      {children}
    </div>
  );
}
