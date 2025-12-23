import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  /** Use narrower padding for certain layouts */
  narrow?: boolean;
}

/**
 * Consistent container component with responsive padding.
 * Default: px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40
 * Narrow: px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16
 */
export default function Container({
  children,
  className,
  narrow = false,
}: ContainerProps) {
  return (
    <div
      className={cn(
        "container mx-auto",
        narrow
          ? "px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16"
          : "px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40",
        className
      )}
    >
      {children}
    </div>
  );
}
