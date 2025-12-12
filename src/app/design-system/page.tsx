import type { Metadata } from "next";
import Button, { variantClasses, sizeClasses } from "@/components/ui/Button";
import {
  Heading,
  Text,
  headingStyles,
  textStyles,
} from "@/components/ui/Typography";

export const metadata: Metadata = {
  title: "Design System",
  description:
    "Typography, buttons, and UI components showcase with specifications.",
};

const SpecTable = ({
  title,
  columns = ["Variant", "Example", "Specifications"],
  children,
}: {
  title: string;
  columns?: string[];
  children: React.ReactNode;
}) => (
  <div className="mb-16">
    <Heading as="h5" className="mb-6 pb-2 border-b border-slate-200">
      {title}
    </Heading>
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-50">
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                className="p-4 text-sm font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">{children}</tbody>
      </table>
    </div>
  </div>
);

const SpecRow = ({
  name,
  example,
  specs,
}: {
  name: string;
  example: React.ReactNode;
  specs: string;
}) => (
  <tr className="group hover:bg-slate-50 transition-colors">
    <td className="p-4 font-medium text-slate-900 min-w-[150px] text-xs">
      {name}
    </td>
    <td className="p-4">{example}</td>
    <td className="p-4">
      <code className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-600 font-mono">
        {specs}
      </code>
    </td>
  </tr>
);

export default function DesignSystemPage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24">
      {/* Header */}
      <header className="bg-gradient-to-r from-emerald-700 to-emerald-900 border-b border-green/10 py-16">
        <div className="container mx-auto px-6">
          <Heading as="h1" className="text-5xl mb-4 text-white">
            Design System
          </Heading>
          <Text variant="subtitle" className="text-white/80 max-w-2xl">
            A comprehensive overview of visual styles and components with
            technical specifications.
          </Text>
        </div>
      </header>

      <div className="container mx-auto">
        {/* Typography Section */}
        <section className="mb-24 py-12">
          <div className="mb-8">
            <Text
              variant="subtitle"
              className="text-green uppercase tracking-widest mb-2"
            >
              Typography
            </Text>
            <Heading as="h2" className="text-4xl">
              Type Scale & Styles
            </Heading>
          </div>

          <SpecTable title="Headings">
            {Object.entries(headingStyles).map(([tag, classes]) => (
              <SpecRow
                key={tag}
                name={`Heading ${tag.toUpperCase()}`}
                example={
                  <Heading as={tag as any} className="whitespace-nowrap">
                    The Quick Brown Fox
                  </Heading>
                }
                specs={classes}
              />
            ))}
          </SpecTable>

          <SpecTable title="Granular Text Variants (Fixed Sizes)">
            {Object.entries(textStyles)
              .filter(([variant]) => variant.startsWith("body-"))
              .map(([variant, classes]) => (
                <SpecRow
                  key={variant}
                  name={variant}
                  example={
                    <Text variant={variant as any}>
                      The quick brown fox jumps over the lazy dog.
                    </Text>
                  }
                  specs={classes}
                />
              ))}
          </SpecTable>

          <SpecTable title="Semantic Text Variants">
            {Object.entries(textStyles)
              .filter(([variant]) => !variant.startsWith("body-"))
              .map(([variant, classes]) => (
                <SpecRow
                  key={variant}
                  name={variant}
                  example={
                    <Text variant={variant as any}>
                      The quick brown fox jumps over the lazy dog.
                    </Text>
                  }
                  specs={classes}
                />
              ))}
          </SpecTable>
        </section>

        {/* Buttons Section */}
        <section className="mb-24">
          <div className="mb-8">
            <Text
              variant="body-14"
              className="text-green uppercase tracking-widest mb-2"
            >
              Components
            </Text>
            <Heading as="h2" className="text-4xl">
              Buttons
            </Heading>
          </div>

          <SpecTable title="Button Variants">
            {Object.entries(variantClasses).map(([variant, classes]) => (
              <SpecRow
                key={variant}
                name={variant.charAt(0).toUpperCase() + variant.slice(1)}
                example={
                  <div
                    className={
                      variant === "secondary" || variant === "white"
                        ? "bg-slate-800 p-4 rounded-lg inline-block"
                        : ""
                    }
                  >
                    <Button variant={variant as any}>Click Me</Button>
                  </div>
                }
                specs={classes}
              />
            ))}
          </SpecTable>

          <SpecTable title="Button Sizes">
            {Object.entries(sizeClasses).map(([size, classes]) => (
              <SpecRow
                key={size}
                name={`Size: ${size.toUpperCase()}`}
                example={
                  <Button size={size as any} variant="primary">
                    Button {size}
                  </Button>
                }
                specs={classes}
              />
            ))}
          </SpecTable>
        </section>

        {/* Colors Section */}
        <section>
          <div className="mb-8">
            <Text
              variant="body-14"
              className="text-green uppercase tracking-widest mb-2"
            >
              Foundation
            </Text>
            <Heading as="h2" className="text-4xl">
              Color Palette
            </Heading>
          </div>

          <SpecTable
            title="Theme Colors"
            columns={["Color Name", "Preview", "Hex Value"]}
          >
            <SpecRow
              name="Primary (Green)"
              example={
                <div className="w-16 h-16 rounded-lg bg-green shadow-lg" />
              }
              specs="#10b981"
            />
            <SpecRow
              name="Slate 900 (Dark)"
              example={
                <div className="w-16 h-16 rounded-lg bg-slate-900 shadow-lg" />
              }
              specs="#0f172a"
            />
            <SpecRow
              name="White"
              example={
                <div className="w-16 h-16 rounded-lg bg-white border border-slate-200 shadow-lg" />
              }
              specs="#ffffff"
            />
            <SpecRow
              name="Muted"
              example={<div className="w-16 h-16 rounded-lg bg-slate-400" />}
              specs="#94a3b8"
            />
          </SpecTable>
        </section>
      </div>
    </main>
  );
}
