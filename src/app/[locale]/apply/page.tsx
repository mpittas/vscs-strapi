import type { Metadata } from "next";
import PageTitle from "@/components/ui/PageTitle";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import MultiStepForm from "@/components/forms/MultiStepForm";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  const { t } = await initTranslations(locale, ["careers", "common"]);

  return {
    title: t("careers:apply_page_title", "Кандидатствай за позиция"),
    description: t(
      "careers:apply_page_description",
      "Подайте кандидатурата си, за да се присъедините към екипа на VS Construction Services"
    ),
  };
};

export default async function ApplyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { t, resources } = await initTranslations(locale, [
    "careers",
    "common",
  ]);

  return (
    <TranslationsProvider
      locale={locale}
      resources={resources}
      namespaces={["careers", "common"]}
    >
      <PageTitle
        title={t("careers:apply_page_title", "Кандидатствай за позиция")}
        breadcrumbs={[
          { label: t("common:nav.home"), href: "/" },
          { label: t("careers:breadcrumbs.careers"), href: "/karieri" },
          { label: t("careers:breadcrumbs.apply", "Кандидатствай") },
        ]}
      />

      <Section bgColor="bg-[#F4F4F4]" paddingY="lg">
        <Container>
          <div className="max-w-3xl mx-auto">
            <MultiStepForm />
          </div>
        </Container>
      </Section>
    </TranslationsProvider>
  );
}
