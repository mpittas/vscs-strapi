import { cn } from "@/lib/utils";
import React from "react";

// =========================================
// Heading Component
// =========================================

type HeadingProps = {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: React.ReactNode;
  className?: string;
  id?: string;
  style?: React.CSSProperties; // Added style prop
};

export function Heading({
  as: Component = "h2",
  children,
  className,
  id,
  style,
}: HeadingProps) {
  // Styles match global base styles but allow for override and specific component usage
  const styles = {
    h1: "text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-slate-900 dark:text-gray-100",
    h2: "text-3xl sm:text-4xl font-medium tracking-tight text-slate-900 dark:text-gray-100",
    h3: "text-2xl sm:text-3xl font-medium tracking-tight text-slate-900 dark:text-gray-100",
    h4: "text-xl sm:text-2xl font-medium tracking-tight text-slate-900 dark:text-gray-100",
    h5: "text-lg sm:text-xl font-medium tracking-tight text-slate-900 dark:text-gray-100",
    h6: "text-base font-medium tracking-tight text-slate-900 dark:text-gray-100",
  };

  return (
    <Component
      id={id}
      className={cn(styles[Component], className)}
      style={style}
    >
      {children}
    </Component>
  );
}

// =========================================
// Text Component
// =========================================

type TextProps = {
  as?: "p" | "span" | "div" | "blockquote" | "figcaption";
  variant?:
    | "body"
    | "lead"
    | "large"
    | "small"
    | "muted"
    | "body-12"
    | "body-12-sb"
    | "body-14"
    | "body-14-sb"
    | "body-16"
    | "body-16-sb"
    | "body-18"
    | "body-18-sb"
    | "body-20"
    | "body-20-sb"
    | "body-22"
    | "body-22-sb";
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export function Text({
  as: Component = "p",
  variant = "body-16",
  children,
  className,
  style,
}: TextProps) {
  const styles: Record<string, string> = {
    // Semantic variants
    body: "text-base leading-7 font-book",
    lead: "text-xl leading-8 font-book",
    large: "text-lg font-semibold", // Updated to semibold to match titles if appropriate, or keep bold? User said titles semibold. Usually large text is semi-bold.
    small: "text-sm font-medium leading-none", // Keep medium for small?
    muted: "text-sm font-book",

    // Granular variants (Mobile First - MD sizes can be overridden via className if needed)
    "body-12": "text-xs",
    "body-12-sb": "text-xs font-semibold",

    "body-14": "text-sm",
    "body-14-sb": "text-sm font-semibold",

    "body-16": "text-base",
    "body-16-sb": "text-base font-semibold",

    "body-18": "text-lg",
    "body-18-sb": "text-lg font-semibold",

    "body-20": "text-xl",
    "body-20-sb": "text-xl font-semibold",

    "body-22": "text-[22px] leading-snug",
    "body-22-sb": "text-[22px] leading-snug font-semibold",
  };

  return (
    <Component
      className={cn(styles[variant] || styles["body-16"], className)}
      style={style}
    >
      {children}
    </Component>
  );
}
