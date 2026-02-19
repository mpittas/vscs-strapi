import type { Metadata } from "next";
import PageTitle from "@/components/ui/PageTitle";
import WorkProcess from "@/components/sections/WorkProcess";
import KeyServices from "@/components/sections/KeyServices";
import InstallationTypes from "@/components/sections/InstallationTypes";
import ServiceSteps from "@/components/sections/ServiceSteps";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const { t } = await initTranslations(locale, ["services"]);

  return {
    title: t("services:metadata.title"),
    description: t("services:metadata.description"),
  };
}

const i18nNamespaces = ["services", "common", "about"];

export default async function ServicesPage({ params }: PageProps) {
  const { locale } = await params;
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <TranslationsProvider
      locale={locale}
      resources={resources}
      namespaces={i18nNamespaces}
    >
      {/* Page Title Section */}
      <PageTitle
        title={t("services:page_title")}
        backgroundImage="/images/solar-panel-bg-compressed.jpg"
        breadcrumbs={[
          { label: t("services:breadcrumbs.home"), href: "/" },
          { label: t("services:breadcrumbs.services") },
        ]}
      />

      <WorkProcess />

      <KeyServices />

      <InstallationTypes />
    </TranslationsProvider>
  );
}
