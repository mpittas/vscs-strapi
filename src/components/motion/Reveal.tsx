import { cn } from "@/lib/utils";

type RevealType = "rise" | "fade" | "title" | "zoom" | "wipe";

interface RevealProps {
  children: React.ReactNode;
  type?: RevealType;
  delay?: number;
  className?: string;
  as?: keyof HTMLElementTagNameMap;
}

export default function Reveal({
  children,
  type = "rise",
  delay,
  className,
  as: Tag = "div",
}: RevealProps) {
  const Component = Tag as React.ElementType;

  return (
    <Component
      data-reveal={type === "wipe" ? "zoom" : type}
      data-reveal-delay={delay || undefined}
      className={cn(className)}
    >
      {children}
    </Component>
  );
}
