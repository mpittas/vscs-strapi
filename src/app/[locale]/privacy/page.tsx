import type { Metadata } from "next";
import Link from "next/link";
import PageTitle from "@/components/ui/PageTitle";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import LegalDocument, {
  type LegalDocumentContent,
} from "@/components/legal/LegalDocument";
import { Text } from "@/components/ui/Typography";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { t } = await initTranslations(locale, ["privacy"]);

  return {
    title: t("privacy:metadata.title"),
    description: t("privacy:metadata.description"),
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { t, resources } = await initTranslations(locale, [
    "privacy",
    "common",
  ]);

  const content = t("privacy:content", {
    returnObjects: true,
  }) as LegalDocumentContent | undefined;
  const translationPending = t("privacy:translation_pending", {
    defaultValue: "",
  });

  return (
    <TranslationsProvider
      locale={locale}
      resources={resources}
      namespaces={["privacy", "common"]}
    >
      <PageTitle
        title={t("privacy:page_title")}
        breadcrumbs={[
          { label: t("common:nav.home"), href: "/" },
          { label: t("privacy:breadcrumbs.privacy") },
        ]}
      />

      <Section className="py-16 md:py-24 bg-white" paddingY="none">
        <Container size="sm">
          {content?.sections?.length ? (
            <LegalDocument content={content} />
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
              <Text variant="body-16" className="text-slate-700 mb-6">
                {translationPending}
              </Text>
              {locale !== "bg" && (
                <Link
                  href="/privacy"
                  className="text-brand-green hover:underline font-medium"
                >
                  <Text variant="body-16" as="span">
                    {t("common:footer.privacy_policy")} (BG)
                  </Text>
                </Link>
              )}
            </div>
          )}
        </Container>
      </Section>
    </TranslationsProvider>
  );
}
