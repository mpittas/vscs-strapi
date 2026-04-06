// Centralized markdown component styles
import type { ComponentProps } from "react";

type AnchorProps = ComponentProps<"a">;
type HeadingProps = ComponentProps<"h1">;
type ParagraphProps = ComponentProps<"p">;
type UlProps = ComponentProps<"ul">;
type OlProps = ComponentProps<"ol">;
type ListItemProps = ComponentProps<"li">;
type BlockquoteProps = ComponentProps<"blockquote">;

export const markdownComponents = {
  a: ({ href, children, target, rel, ...props }: AnchorProps) => (
    <a
      href={href}
      className="text-slate-600 hover:text-slate-800 underline font-normal transition-colors"
      target={target}
      rel={rel || (target === "_blank" ? "noopener noreferrer" : undefined)}
      {...props}
    >
      {children}
    </a>
  ),
  h1: ({ children, ...props }: HeadingProps) => (
    <h1 className="text-3xl font-medium text-slate-900 mt-10 mb-4" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: HeadingProps) => (
    <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-6" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: Omit<HeadingProps, "as">) => (
    <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }: Omit<HeadingProps, "as">) => (
    <h4 className="text-lg font-bold text-slate-900 mt-6 mb-3" {...props}>
      {children}
    </h4>
  ),
  p: ({ children, ...props }: ParagraphProps) => (
    <p className="mb-4 leading-relaxed text-slate-600" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: UlProps) => (
    <ul className="list-disc pl-5 mb-4 flex flex-col gap-y-2" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: OlProps) => (
    <ol className="list-decimal pl-5 mb-4 flex flex-col gap-y-2" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: ListItemProps) => (
    <li className="mt-0 mb-0" {...props}>
      {children}
    </li>
  ),
  strong: ({ children, ...props }: ComponentProps<"strong">) => (
    <strong className="text-slate-900 font-normal" {...props}>
      {children}
    </strong>
  ),
  blockquote: ({ children, ...props }: BlockquoteProps) => (
    <blockquote
      className="border-l-4 border-[#9de044] pl-6 py-2 my-6 italic text-slate-700"
      {...props}
    >
      {children}
    </blockquote>
  ),
  img: ({ src, alt, ...props }: ComponentProps<"img">) => (
    <img src={src} alt={alt} className="rounded-2xl" {...props} />
  ),
};
