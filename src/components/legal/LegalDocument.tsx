import { Heading, Text } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";

export interface LegalList {
  type?: "unordered" | "ordered";
  items: string[];
}

export interface LegalSubsection {
  title: string;
  intro?: string;
  list?: LegalList;
}

export interface LegalSection {
  title: string;
  paragraphs?: string[];
  paragraphsAfter?: string[];
  list?: LegalList;
  subsections?: LegalSubsection[];
  contactBlock?: {
    lines: string[];
    email?: string;
    phone?: string;
  };
}

export interface LegalDocumentContent {
  sections: LegalSection[];
  effectiveDate?: string;
}

interface LegalDocumentProps {
  content: LegalDocumentContent;
  className?: string;
}

function LegalListBlock({ list }: { list: LegalList }) {
  const ListTag = list.type === "ordered" ? "ol" : "ul";
  const listClass =
    list.type === "ordered"
      ? "list-decimal pl-5 space-y-2"
      : "list-disc pl-5 space-y-2";

  return (
    <ListTag className={cn(listClass, "mb-4 text-slate-700")}>
      {list.items.map((item) => (
        <li key={item}>
          <Text variant="body-16" as="span" className="text-slate-700">
            {item}
          </Text>
        </li>
      ))}
    </ListTag>
  );
}

function ContactBlock({
  lines,
  email,
  phone,
}: NonNullable<LegalSection["contactBlock"]>) {
  return (
    <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
      <div className="space-y-2">
        {lines.map((line) => (
          <Text key={line} variant="body-16" className="text-slate-800">
            {line}
          </Text>
        ))}
      </div>
      {(email || phone) && (
        <div className="mt-4 space-y-1 border-t border-slate-200 pt-4">
          {email && (
            <Text variant="body-16" className="text-slate-700">
              <a
                href={`mailto:${email}`}
                className="text-brand-green hover:underline"
              >
                {email}
              </a>
            </Text>
          )}
          {phone && (
            <Text variant="body-16" className="text-slate-700">
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="text-brand-green hover:underline"
              >
                {phone}
              </a>
            </Text>
          )}
        </div>
      )}
    </div>
  );
}

export default function LegalDocument({ content, className }: LegalDocumentProps) {
  return (
    <article className={cn("legal-document", className)}>
      {content.sections.map((section) => (
        <section key={section.title} className="mb-10 last:mb-0">
          <Heading
            as="h2"
            className="!text-xl md:!text-2xl font-medium mb-4 text-slate-900"
          >
            {section.title}
          </Heading>

          {section.paragraphs?.map((paragraph) => (
            <Text
              key={paragraph}
              variant="body-16"
              className="mb-4 leading-relaxed text-slate-700"
            >
              {paragraph}
            </Text>
          ))}

          {section.list && <LegalListBlock list={section.list} />}

          {section.paragraphsAfter?.map((paragraph) => (
            <Text
              key={paragraph}
              variant="body-16"
              className="mb-4 leading-relaxed text-slate-700"
            >
              {paragraph}
            </Text>
          ))}

          {section.subsections?.map((subsection) => (
            <div key={subsection.title} className="mb-6 last:mb-0">
          {subsection.title && (
              <Heading
                as="h3"
                className="!text-lg font-medium mb-3 text-slate-900"
              >
                {subsection.title}
              </Heading>
            )}
              {subsection.intro && (
                <Text
                  variant="body-16"
                  className="mb-3 leading-relaxed text-slate-700"
                >
                  {subsection.intro}
                </Text>
              )}
              {subsection.list && <LegalListBlock list={subsection.list} />}
            </div>
          ))}

          {section.contactBlock && (
            <ContactBlock {...section.contactBlock} />
          )}
        </section>
      ))}

      {content.effectiveDate && (
        <Text
          variant="body-14"
          className="mt-12 border-t border-slate-200 pt-6 text-slate-500"
        >
          {content.effectiveDate}
        </Text>
      )}
    </article>
  );
}
