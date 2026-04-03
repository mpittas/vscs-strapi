import type { Metadata } from "next";
import PageTitle from "@/components/ui/PageTitle";
import AboutIntro from "@/components/sections/AboutIntro";
import OurValues from "@/components/sections/OurValues";
import OurTeam from "@/components/sections/OurTeam";
import NumbersCounter from "@/components/sections/NumbersCounter";
import Marquee from "@/components/sections/Marquee";
import ConsultationForm from "@/components/sections/ConsultationForm";
import CTABanner from "@/components/sections/CTABanner";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { t } = await initTranslations(locale, ["about"]);

  return {
    title: t("about:metadata.title"),
    description: t("about:metadata.description"),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { t, resources } = await initTranslations(locale, [
    "about",
    "common",
    "home",
  ]);

  return (
    <TranslationsProvider
      locale={locale}
      resources={resources}
      namespaces={["about", "common", "home"]}
    >
      {/* Page Title Section */}
      <PageTitle
        title={t("metadata.title")}
        breadcrumbs={[
          { label: t("common:nav.home"), href: "/" },
          { label: t("common:nav.about") },
        ]}
      />

      {/* About Intro Section */}
      <AboutIntro />

      {/* Numbers Counter Section */}
      <NumbersCounter />

      <Marquee />

      {/* Our Values Section */}
      <OurValues />

      {/* Our Team Section */}
      <OurTeam />

      <ConsultationForm />

      <CTABanner />
    </TranslationsProvider>
  );
}
