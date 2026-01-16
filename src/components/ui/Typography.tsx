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

// Export styles for design system usage
export const headingStyles = {
  h1: "font-normal tracking-tight text-slate-900",
  h2: "text-[34px] lg:text-[44px] leading-[1.15] font-normal tracking-tight text-slate-900",
  h3: "font-normal tracking-tight text-slate-900",
  h4: "text-[22px] font-medium tracking-tight text-slate-900",
  h5: "text-[20px] font-medium tracking-tight text-slate-900",
  h6: "text-[18px] leading-6 font-medium tracking-tight text-slate-900",
};

export function Heading({
  as: Component = "h2",
  children,
  className,
  id,
  style,
}: HeadingProps) {
  return (
    <Component
      id={id}
      className={cn(headingStyles[Component], className)}
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
    | "small-title"
    | "subtitle"
    | "page-title"
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

// Export styles for design system usage
export const textStyles: Record<string, string> = {
  // Semantic variants
  "small-title": "text-sm font-normal uppercase text-brand-green",
  subtitle: "text-lg text-slate-600 font-book",
  "page-title":
    "text-5xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-slate-900 leading-[1.15]",

  // Granular variants (Mobile First)
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

export function Text({
  as: Component = "div",
  variant = "body-16",
  children,
  className,
  style,
}: TextProps) {
  return (
    <Component
      className={cn(textStyles[variant] || textStyles["body-16"], className)}
      style={style}
    >
      {children}
    </Component>
  );
}
