import type { Metadata } from "next";
import Link from "next/link";
import PageTitle from "@/components/ui/PageTitle";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { Heading, Text } from "@/components/ui/Typography";
import ConsultationPageForm from "@/components/forms/ConsultationPageForm";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import { BarChart3, ClipboardCheck, Sun } from "lucide-react";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  const { t } = await initTranslations(locale, ["consultation"]);

  return {
    title: t("consultation:metadata.title"),
    description: t("consultation:metadata.description"),
  };
};

const benefitIcons = {
  assessment: Sun,
  roadmap: ClipboardCheck,
  expertise: BarChart3,
} as const;

export default async function ConsultationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { t, resources } = await initTranslations(locale, [
    "consultation",
    "common",
  ]);

  const benefitKeys = ["assessment", "roadmap", "expertise"] as const;
  const stepKeys = ["step1", "step2", "step3"] as const;

  return (
    <TranslationsProvider
      locale={locale}
      resources={resources}
      namespaces={["consultation", "common"]}
    >
      <PageTitle
        title={t("consultation:page_title")}
        subtitle={t("consultation:page_subtitle")}
        backgroundImage="/images/solar-panels-landscape-min.jpg"
        breadcrumbs={[
          { label: t("common:nav.home"), href: "/" },
          { label: t("consultation:breadcrumbs.consultation") },
        ]}
      />

      <Section className="py-20 bg-[#F4F4F4]" paddingY="none">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Text
              variant="body-14"
              className="text-brand-green uppercase tracking-widest font-medium mb-4"
            >
              {t("consultation:benefits.badge")}
            </Text>
            <Heading as="h2" className="text-3xl md:text-4xl font-normal">
              {t("consultation:benefits.title")}
            </Heading>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefitKeys.map((key) => {
              const Icon = benefitIcons[key];
              return (
                <div
                  key={key}
                  className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 rounded-full bg-[#001D13] text-brand-green flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <Heading as="h3" className="text-xl font-medium mb-3">
                    {t(`consultation:benefits.items.${key}.title`)}
                  </Heading>
                  <Text variant="body-16" className="text-slate-600">
                    {t(`consultation:benefits.items.${key}.description`)}
                  </Text>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section
        paddingY="xl"
        className="bg-[#001D13] relative overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: "url('/images/solar-bg-green-blur.jpg')",
          }}
        />

        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-7">
              <ConsultationPageForm />
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 text-white">
                <Heading as="h3" className="text-2xl text-white mb-8">
                  {t("consultation:sidebar.title")}
                </Heading>

                <ol className="space-y-6 mb-10">
                  {stepKeys.map((step, index) => (
                    <li key={step} className="flex gap-4">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-green text-black flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </span>
                      <Text variant="body-16" className="text-white/80 pt-1">
                        {t(`consultation:sidebar.steps.${step}`)}
                      </Text>
                    </li>
                  ))}
                </ol>

                <div className="pt-8 border-t border-white/10 space-y-4">
                  <Text variant="body-14" className="text-white/60 uppercase tracking-wider">
                    {t("consultation:sidebar.phone_label")}
                  </Text>
                  <a
                    href="tel:+359877159858"
                    className="block text-2xl text-white hover:text-brand-green transition-colors"
                  >
                    +359 877 15 98 58
                  </a>
                  <Link
                    href="/kontakti"
                    className="inline-flex text-brand-green hover:text-white transition-colors text-sm"
                  >
                    {t("consultation:sidebar.contacts_link")} →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </TranslationsProvider>
  );
}
