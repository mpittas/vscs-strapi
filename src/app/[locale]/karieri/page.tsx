import type { Metadata } from "next";
import PageTitle from "@/components/ui/PageTitle";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { Heading } from "@/components/ui/Typography";
import BadgeDefault from "@/components/ui/BadgeDefault";
import CareerItem from "@/components/CareerItem";
import { getCareers } from "@/lib/strapi";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  const { t } = await initTranslations(locale, ["careers"]);

  return {
    title: t("careers:metadata.title"),
    description: t("careers:metadata.description"),
  };
};

export default async function CareersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { t, resources } = await initTranslations(locale, [
    "careers",
    "common",
  ]);
  const careers = await getCareers(locale);

  return (
    <TranslationsProvider
      locale={locale}
      resources={resources}
      namespaces={["careers", "common"]}
    >
      <PageTitle
        title={t("careers:page_title")}
        breadcrumbs={[
          { label: t("common:nav.home"), href: "/" },
          { label: t("careers:breadcrumbs.careers") },
        ]}
      />

      <Section bgColor="bg-white" paddingY="lg">
        <Container>
          {/* Header */}
          <div className="text-center mb-12">
            <BadgeDefault variant="primary" size="sm" className="mb-6">
              {t("careers:open_positions_badge")}
            </BadgeDefault>
            <Heading as="h2" className="text-3xl md:text-4xl lg:text-5xl">
              {t("careers:apply_today")}
            </Heading>
          </div>

          {/* Career Listings */}
          <div data-reveal-group="" className="space-y-4">
            {careers.length > 0 ? (
              careers.map((career: any) => (
                <CareerItem
                  key={career.id}
                  title={career.title}
                  slug={career.slug}
                  location={career.location}
                  shortDescription={career.shortDescription}
                />
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl">
                <Heading as="h3" className="text-xl text-slate-700">
                  {t("careers:no_positions")}
                </Heading>
              </div>
            )}
          </div>
        </Container>
      </Section>
    </TranslationsProvider>
  );
}
